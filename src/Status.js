import { Progress } from '@chakra-ui/react'
import React from 'react';
export default function Status({ isLoading, status }) {
    return (
        <div>
            <h2>
                {isLoading
                    ? `Calculating... ${status || 'uploading'}...`
                    : 'Give me audio!!'}
            </h2>
            <Progress
                size="sm"
                width={500}
                isIndeterminate={isLoading}
                colorScheme="green"
            />
        </div>
    );
}