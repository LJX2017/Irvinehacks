"use client";
// React Code (Description.js)
import React, { useState } from 'react';
import { Button } from "@nextui-org/react";
import {Textarea} from "@nextui-org/react";

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
                body: JSON.stringify({ config: true, in_type: "str", description }),
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
        <div className='px-4 my-3 flex justify-center items-center'>
            <form onSubmit={handleSubmit}>
                <label className='text-white flex justify-center'>Describe your Bot</label>
                <br />
                <textarea value={description} onChange={handleInputChange} className='p-3 bg-black rounded m-2' style={{borderColor: 'red', resize: 'horizontal', borderWidth: '1px', borderStyle: 'solid'}}/>
                <br />
                <div className="flex justify-center"> 
                <Button color="primary" variant="flat" type='submit' className="disable-animation p-3 m-2 rounded" style={{ borderColor: 'blue', borderWidth: '1px', borderStyle: 'solid' }}>
                        Submit
                    </Button>
                </div> 
            </form>
        </div>
    );
};

export default Description;
