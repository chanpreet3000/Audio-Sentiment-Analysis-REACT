const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const { exec } = require('child_process');
const cors = require('cors');
const { HfInference } = require('@huggingface/inference');
require('dotenv').config();

const app = express();
const upload = multer({ dest: 'uploads/' });

const HUGGING_FACE_API_URL = "https://api-inference.huggingface.co/models/facebook/wav2vec2-base-960h";
const HUGGING_FACE_API_TOKEN = process.env.HUGGING_FACE_API_TOKEN;

const hf = new HfInference(HUGGING_FACE_API_TOKEN);

app.use(cors());

app.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const inputFilePath = req.file.path;
    console.log(inputFilePath);
    const outputFilePath = inputFilePath + '.wav';

    try {
        // Convert MP3 to WAV using ffmpeg
        await new Promise((resolve, reject) => {
            exec(`ffmpeg -i ${inputFilePath} -ar 16000 -ac 1 ${outputFilePath}`, (error, stdout, stderr) => {
                if (error) {
                    return reject(`ffmpeg error: ${error.message}`);
                }
                resolve();
            });
        });

        // Read the WAV file
        const audioData = fs.readFileSync(outputFilePath);

        // Send the audio data to Hugging Face API for transcription
        const response = await axios.post(HUGGING_FACE_API_URL, audioData, {
            headers: {
                'Authorization': `Bearer ${HUGGING_FACE_API_TOKEN}`,
                'Content-Type': 'audio/wav'
            }
        });

        const transcription = response.data.text;

        // Perform sentiment analysis on the transcription
        const sentimentResponse = await hf.textClassification({
            model: 'distilbert-base-uncased-finetuned-sst-2-english',
            inputs: transcription
        });

        // Extract sentiment data
        const sentiment = sentimentResponse[0];

        // Clean up the uploaded and converted files
        fs.unlinkSync(inputFilePath);
        fs.unlinkSync(outputFilePath);

        console.log(transcription);
        console.log(sentiment);

        return res.status(200).json({
            transcript: transcription,
            sentiment: {
                label: sentiment.label,
                score: sentiment.score
            },
            emotions: [],
            entities: []
        });

    } catch (error) {
        console.log(error);
        // Clean up the uploaded and converted files in case of an error
        fs.unlinkSync(inputFilePath);
        if (fs.existsSync(outputFilePath)) {
            fs.unlinkSync(outputFilePath);
        }
        return res.status(500).json({ error: error.message });
    }
});

app.post('/recording', upload.single('audioFile'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const inputFilePath = req.file.path;
    console.log(inputFilePath);
    const outputFilePath = inputFilePath + '.wav';

    try {
        // Convert webm to WAV using ffmpeg
        await new Promise((resolve, reject) => {
            exec(`ffmpeg -i ${inputFilePath} -ar 16000 -ac 1 ${outputFilePath}`, (error, stdout, stderr) => {
                if (error) {
                    return reject(`ffmpeg error: ${error.message}`);
                }
                resolve();
            });
        });

        // Read the WAV file
        const audioData = fs.readFileSync(outputFilePath);

        // Send the audio data to Hugging Face API for transcription
        const response = await axios.post(HUGGING_FACE_API_URL, audioData, {
            headers: {
                'Authorization': `Bearer ${HUGGING_FACE_API_TOKEN}`,
                'Content-Type': 'audio/wav'
            }
        });

        const transcription = response.data.text;

        // Perform sentiment analysis on the transcription
        const sentimentResponse = await hf.textClassification({
            model: 'distilbert-base-uncased-finetuned-sst-2-english',
            inputs: transcription
        });

        // Extract sentiment data
        const sentiment = sentimentResponse[0];

        // Clean up the uploaded and converted files
        fs.unlinkSync(inputFilePath);
        fs.unlinkSync(outputFilePath);

        console.log(transcription);
        console.log(sentiment);

        return res.status(200).json({
            transcript: transcription,
            sentiment: {
                label: sentiment.label,
                score: sentiment.score
            },
            emotions: [],
            entities: []
        });

    } catch (error) {
        console.log(error);
        // Clean up the uploaded and converted files in case of an error
        fs.unlinkSync(inputFilePath);
        if (fs.existsSync(outputFilePath)) {
            fs.unlinkSync(outputFilePath);
        }
        return res.status(500).json({ error: error.message });
    }
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
