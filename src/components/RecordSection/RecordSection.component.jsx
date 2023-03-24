import { useState, useEffect } from 'react';
import 'react-voice-recorder/dist/index.css'
import Legend from '../Legend/Legend.component.jsx';
import Lottie from 'react-lottie';
import animationData from '../../animations/temp1.json'
import Result from '../TextUtils/Result';
import Status from '../TextUtils/Status';
import { Recorder } from 'react-voice-recorder';
import axios from 'axios';
import './RecordSection.styles.css'

const assembly = axios.create({
    baseURL: 'https://api.assemblyai.com/v2',
    headers: {
        authorization: "3ac2bb277daf45bcbc8c846d467d649a",
        'content-type': 'application/json',
    },
});
const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    renderer: 'svg'
};
const initialState = {
    url: null,
    blob: null,
    chunks: null,
    duration: {
        h: 0,
        m: 0,
        s: 0,
    },
};
const RecorderSection = () => {
    const [audioDetails, setAudioDetails] = useState(initialState);
    const [transcript, setTranscript] = useState({ id: '' });
    const [helperText, setHelperText] = useState('Upload an audio file.');

    useEffect(() => {
        if (transcript.id !== '' && transcript.status !== 'completed') {
            fetchTranscriptResults();
        }
    }, [transcript]);

    const handleAudioStop = (data) => {
        console.log("Audio Stoped with data : ", data);
        setAudioDetails(data);
    };
    const handleReset = () => {
        setHelperText('Upload an audio file.');
        console.log("Audio Reset ");
        setAudioDetails({ ...initialState });
        setTranscript({ id: '' });
    };
    const handleAudioUpload = async (audioFile) => {
        if (audioFile == null) {
            console.log("File uploaded is Empty...");
            setHelperText("File uploaded is Empty.");
        } else {
            const formData = new FormData();
            formData.append('file', audioFile);
            axios.post('/upload', formData)
              .then(response => console.log(response))
              .catch(error => console.log(error));
            // setTranscript({ id: '' });
            // setHelperText("Uploading Audio..")
            // console.log("Uploading...", audioFile);

            // const { data: uploadResponse } = await assembly.post('/upload', audioFile);
            // console.log("File Uploaded : ", uploadResponse)
            // setHelperText("Audio Uploaded..")

            // const { data } = await assembly.post('/transcript', {
            //     audio_url: uploadResponse.upload_url,
            //     sentiment_analysis: true,
            //     entity_detection: true,
            //     iab_categories: true,
            // });
            // setHelperText("Sending Audio for Transcription.")
            // console.log("File sent for transcript : ", data)
            // setTranscript({ id: data.id });
        }
    };
    const fetchTranscriptResults = async () => {
        await assembly.get(`/transcript/${transcript.id}`)
            .then((res) => {
                console.log(res.data.status);
                if (res.data.status === 'completed') {
                    setTranscript(res.data);
                    setHelperText("Audio processing Completed!");
                    return;
                }
                else {
                    if (res.data.status === 'queued') {
                        setHelperText('Queuing...')
                    } else if (res.data.status === 'processing') {
                        setHelperText("Audio is processing ...");
                    } else if (res.data.status === 'error') {
                        setHelperText(`An error occured during processing : ${res.data.error}`);
                        return;
                    }
                    setTimeout(async () => {
                        await fetchTranscriptResults();
                    }, 1000);
                }
            }).catch((error) => {
                console.log(error);
            });
    };
    return (
        <section className='record-section' id='record-section'>
            <Legend />
            <div className='record-top-section'>
                <div className='lottie-animation'>
                    <Lottie options={defaultOptions} />
                </div>
                <div className='record-details'>
                    {
                        transcript.status === 'completed' ?
                            <Result transcript={transcript} /> :
                            <Status transcript={transcript} status={helperText} />
                    }
                </div>
            </div>
            <div className='record-bottom-section'>
                <Recorder
                    title={"Stop the recording before uploading!"}
                    record={true}
                    audioURL={audioDetails.url}
                    handleAudioStop={handleAudioStop}
                    handleAudioUpload={handleAudioUpload}
                    handleReset={handleReset}
                />
            </div>
        </section>
    );
};

export default RecorderSection;