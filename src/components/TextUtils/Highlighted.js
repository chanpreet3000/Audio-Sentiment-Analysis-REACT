import React from 'react';

const sentimentColor = {
    POSITIVE: 'lightgreen',
    NEGATIVE: 'lightpink',
    NEUTRAL: 'lightgray',
};

export default function Highlighted({ text, sentiment, entities }) {
    const entityText = entities.map((e) => e.text);
    const parts = text.split(new RegExp(`(${entityText.join('|')})`, 'g'));//splitting to find the entities
    return (
        <div style={{
            display: "inline-block",
            backgroundColor: sentimentColor[sentiment],
            padding: "4px",
            margin: "0px 2px"
        }}>
            {parts.map((part, key) => {
                const matchingEntity = entities.find((e) => e.text === part);
                if (matchingEntity) {
                    return (
                        <span key={key} display="inline" fontWeight="bold">{part}</span>
                    );
                }
                return part;
            })}
        </div>
    );
}