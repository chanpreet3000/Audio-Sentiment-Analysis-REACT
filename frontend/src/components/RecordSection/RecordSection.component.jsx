import axios from "axios";
import React, { useEffect, useState } from "react";
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import './RecordSection.styles.css'
import Legend from "../Legend/Legend.component";

const RecordSection = () => {
    const recorderControls = useAudioRecorder()
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [helperText, sethelperText] = useState("Please Upload Audio File")

    const handleFileUpload = (event) => {
        setFile(event.target.files[0]);
    }
    const uploadFile = async () => {
        setData(null);
        sethelperText("Audio Sent for processing...");
        setIsLoading(true);
        const formData = new FormData();
        formData.append('file', file);
        axios.post('http://localhost:4000/upload', formData)
            .then((response) => {
                console.log(response);
                setIsLoading(false);
                sethelperText("Data Results")
                setData(response.data);
            })
            .catch(error => {
                console.log(error)
                setIsLoading(false);
                sethelperText("Please Upload Audio File")
                setData(null);
            });
    }

    const uploadRecordedAudio = async (blob) => {
        setData(null);
        sethelperText("Audio Sent for processing...");
        setIsLoading(true);
        const formData = new FormData();
        formData.append("audioFile", blob, "audio.webm");
        axios.post('http://localhost:4000/upload', formData)
            .then((response) => {
                console.log(response);
                setIsLoading(false);
                sethelperText("Data Results")
                setData(response.data);
            })
            .catch(error => {
                console.log(error)
                setIsLoading(false);
                sethelperText("Please Upload Audio File")
                setData(null);
            });
    };
    return (
        <section className="record-section" id="record-section">
            <Legend />
            <div className="record-container">
                <div className='file-upload-container'>
                    <h1>Upload Audio</h1>
                    <input type="file" onChange={handleFileUpload} />
                    <button onClick={uploadFile}>Upload Audio</button>
                </div>
                <div style={{
                    width: "2px",
                    height: "250px",
                    backgroundColor: '#ddd',
                }}>

                </div>
                <div className="file-record-container">
                    <h1>Record Audio</h1>
                    <AudioRecorder
                        onRecordingComplete={(blob) => uploadRecordedAudio(blob)}
                        recorderControls={recorderControls} />
                </div>
            </div>
            {
                <h1>{helperText}</h1>
            }
            {
                isLoading === true ?
                    <div className='loader'></div>
                    :
                    <></>
            }
            {
                data === null ?
                    <></>
                    :
                    <div className="result-items">
                        <div className="result-item">
                            <div className="result-item_title">Transcription</div>
                            <div className="result-item_description">{data.transcript}</div>
                        </div>
                        <div className={`result-item ${data.sentiment.label}`}>
                            <div className="result-item_title">Sentiment</div>
                            <div className="result-item_description">The audio has a {Math.floor(data.sentiment.score * 100)}% {data.sentiment.label} sentiment</div>
                        </div>
                        <div className='result-item'>
                            <div className="result-item_title">Emotions</div>
                            <div className="emotion-items">
                                {
                                    data.emotions.map((ele, key) => {
                                        return (
                                            <div key={key} className='emotion-item'>
                                                <div className='emotion-item__label'>{ele['label']}</div>
                                                <div className='emotion-item__bar' style={{
                                                    width: Math.ceil(ele['score'] * 700),
                                                }}></div>
                                                <div className='emotion-item__score'> {Math.ceil(ele['score'] * 100)}%</div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                        <div className="result-item">
                            <div className="result-item_title">Entities</div>
                            <div className="entity-items">
                                {
                                    data.entities.length > 0?
                                    data.entities.map((ele, key) => {
                                        return (
                                            <div key={key} className='entity-item'>{ele}</div>
                                        );
                                    })
                                    :
                                    <p>No Entites Found</p>
                                }
                            </div>
                        </div>
                    </div>
            }

        </section >
    );
};
export default RecordSection;