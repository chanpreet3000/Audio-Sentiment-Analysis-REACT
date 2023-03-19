import React from 'react';
import './Status.styles.css';
export default function Status({ transcript, status }) {
    console.log(transcript);
    return (
        <div>
            <h2>{status}</h2>
            {
                transcript.id !== '' ?
                    <div className='loader'></div> :
                    <></>
            }
        </div>
    );
}