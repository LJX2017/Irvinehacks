import React, { useState } from 'react';

const VoiceInput = () => {
    const [audioFile, setAudioFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setAudioFile(file);
        }
    };

    const handleUpload = async () => {
        if (audioFile) {
            const formData = new FormData();
            formData.append('audio', audioFile);

            try {
                const response = await fetch('/api/upload-audio', {
                    method: 'POST',
                    body: formData,
                });

                // Handle the response from the server
                // ...
            } catch (error) {
                console.error('Error uploading audio:', error);
            }
        }
    };

    return (
        <div>
            <input type="file" accept="audio/*" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default VoiceInput;
