import React from 'react';
import Highlighted from './Highlighted';
import Topics from './components/Tags/Topics.component';
export default function Result({ transcript }) {
    return (
        <div>
            <div>
                {
                    transcript.sentiment_analysis_results.map(result => (
                        <Highlighted text={result.text} sentiment={result.sentiment} entities={transcript.entities} />
                    ))
                }
            </div>
            <Topics transcript={transcript} />
        </div>
    );
}