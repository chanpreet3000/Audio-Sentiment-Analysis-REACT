const express = require("express");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const ffmpeg = require("fluent-ffmpeg");
const app = express();
const port = 4000;
const fs = require("fs-extra");
const upload = multer({ dest: "uploads/" });
const Sentiment = require("sentiment");
const { text } = require("body-parser");
const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);
app.post("/upload", upload.single("audioFile"), async (req, res) => {
  const audioFile = req.file;
  if (!audioFile) {
    return res.status(400).json({ error: "No audio file uploaded" });
  }
  convertBlobToMP3(audioFile.path, async (err, mp3FilePath) => {
    if (err) {
      return res.status(500).json({ error: "Audio conversion to MP3 failed" });
    }
    const data = await transcribeAudioWithAssemblyAI();
    console.log(data);
    return res.status(200).send(data);
  });
});

async function convertBlobToMP3(inputFilePath, callback) {
  const outputFilePath = "output.mp3"; // Provide the desired output file path

  ffmpeg()
    .input(inputFilePath)
    .inputFormat("webm") // Specify the input format if necessary
    .audioCodec("libmp3lame") // Specify the codec for MP3
    .toFormat("mp3") // Output format is MP3
    .on("end", () => {
      console.log("Audio conversion to MP3 finished");
      callback(null, outputFilePath);
    })
    .on("error", (err) => {
      console.error("Error converting to MP3:", err);
      callback(err, null);
    })
    .save(outputFilePath); // Save the converted audio to the specified file path
}

// Function to transcribe audio with AssemblyAI
async function transcribeAudioWithAssemblyAI(audioFilePath) {
  const baseUrl = "https://api.assemblyai.com/v2";
  const headers = {
    authorization: "7b4ad276a5c14a3ea94028c0f24b043f",
  };
  const path = "./output.mp3";
  const audioData = await fs.readFile(path);
  const uploadResponse = await axios.post(`${baseUrl}/upload`, audioData, {
    headers,
  });
  const uploadUrl = uploadResponse.data.upload_url;
  console.log(uploadUrl);

  const data = {
    audio_url: uploadUrl, // You can also use a URL to an audio or video file on the web
  };
  const url = `${baseUrl}/transcript`;
  const response = await axios.post(url, data, { headers: headers });

  const transcriptId = response.data.id;
  const pollingEndpoint = `${baseUrl}/transcript/${transcriptId}`;

  while (true) {
    const pollingResponse = await axios.get(pollingEndpoint, {
      headers: headers,
    });
    const transcriptionResult = pollingResponse.data;

    if (transcriptionResult.status === "completed") {
      const sentiment = new Sentiment();
      const text = transcriptionResult.text;
      const analysis = sentiment.analyze(text);

      var label = "NONE";
      if (analysis.score > 0) label = "POSITIVE";
      else if (analysis.score == 0) label = "NEUTRAL";
      else label = "NEGATIVE";
      console.log(text);
      console.log(analysis);
      return { transcript: text, sentiment: { label: label, score: analysis.comparative }, emotions: [], entities: [] };
    } else if (transcriptionResult.status === "error") {
      throw new Error(`Transcription failed: ${transcriptionResult.error}`);
    } else {
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
