import React from 'react';
import './Topics.styles.css'
export default function Topics({ transcript }) {
    return (
        <div>
            <h3>Topics Detected: </h3>
            <div className='tags'>
                {
                    Object.keys(transcript.iab_categories_result.summary).filter(
                        topic => transcript.iab_categories_result.summary[topic] > 0.6
                    ).map((topic, key) => {
                        return (
                            <a className='tag' key={key} target='_blank' href={`https://www.google.com/search?q=${topic.split('>').pop()}`}>
                                {topic.split('>').pop()}
                            </a>
                        )
                    })
                }
            </div>
        </div>
    );
}