import React from 'react';
export default function Status({ isLoading, status }) {
    return (
        <div>
            <h2>
                {isLoading
                    ? `Calculating... ${status || 'uploading'}...`
                    : 'Give me audio!!'}
            </h2>
        </div>
    );
}