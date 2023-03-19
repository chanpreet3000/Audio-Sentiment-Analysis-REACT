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

const assemblyApi = axios.create({
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
const Temp = () => {
    const [audioDetails, setAudioDetails] = useState(initialState);
    const [transcript, setTranscript] = useState({ id: '' });
    const [isLoading, setisLoading] = useState(false);
    useEffect(() => {
        if (transcript.id !== '' && transcript.status !== 'completed') {
            fetchTranscriptResults();
        }
    }, [transcript]);

    const handleAudioStop = (data) => {
        console.log("Audio Stoped ");
        console.log(data);
        setAudioDetails(data);
    };
    const handleReset = () => {
        console.log("Audio Reset ");

        setAudioDetails({ ...initialState });
        setTranscript({ id: '' });
    };
    const handleAudioUpload = async (audioFile) => {
        console.log("Uploading..." + audioFile);
        setisLoading(true);
        const { data: uploadResponse } = await assemblyApi.post('/upload', audioFile);
        console.log(uploadResponse)

        const { data } = await assemblyApi.post('/transcript', {
            audio_url: uploadResponse.upload_url,
            sentiment_analysis: true,
            entity_detection: true,
            iab_categories: true,
        });
        console.log(data)

        setTranscript({ id: data.id });
    };
    const fetchTranscriptResults = async () => {
        await assemblyApi.get(`/transcript/${transcript.id}`)
            .then((res) => {
                console.log(res.data.status);
                if (res.data.status === 'completed') {
                    setTranscript(res.data);
                    return;
                } else {
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
                    <Lottie
                        options={defaultOptions}
                    />
                </div>
                <div className='record-details'>
                    {transcript.text && transcript.status === 'completed'
                        ? (<Result transcript={transcript} />) : (<Status isLoading={isLoading} status={transcript.status} />)}
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

export default Temp;