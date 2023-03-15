import React from 'react';
import './Topics.styles.css'
export default function Topics({ transcript }) {
    return (
        <div>
            <h1>Topics Detected: </h1>
            <div className='tags'>
                {Object.keys(transcript.iab_categories_result.summary).filter(
                    topic => transcript.iab_categories_result.summary[topic] > 0.6
                ).map(topic => (
                    <div className='tag'>
                        {topic.split('>').pop()}
                    </div>
                ))}
            </div>
        </div>
    );
}