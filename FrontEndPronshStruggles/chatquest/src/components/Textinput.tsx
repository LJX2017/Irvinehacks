"use client";

import React, { useState } from "react";

type Message = {
    type: string;
    message: string;
    fromUser: boolean;
};

const TextInput = () => {
    const [inputText, setInputText] = useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };

    const handleSubmit = () => {
        // Handle submit logic here
    };

    return (
        <div>
            <input
                type="text"
                value={inputText}
                onChange={handleInputChange}
                placeholder="Enter text..."
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};


export default TextInput;
