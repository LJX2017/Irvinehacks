"use client";
// React Code (Description.js)
import React, { useState } from 'react';

const Description: React.FC = () => {
    const [description, setDescription] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();  // Prevent the default form submission behavior

        console.log('Request:', { description }); // Log the request being sent

        try {
            const response = await fetch('http://127.0.0.1:8000/backend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({config:true, in_type:"str",  description }),
            });

            // Handle response
            const data = await response.json();
            console.log(data);
            
        } catch (error) {
            // Handle error
            console.error('Failed to send description', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea value={description} onChange={handleInputChange} />
            <button type="submit">Submit</button>
        </form>
    );
};

export default Description;
