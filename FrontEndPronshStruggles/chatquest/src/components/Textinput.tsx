// TextInput.tsx
"use client";
import React, { useState } from "react";

type Message = {
  type: string;
  message: string;
  fromUser: boolean;
};

interface TextInputProps {
  onMessageReceived: (message: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ onMessageReceived }) => {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async () => {
    const message: Message = {
      type: "text",
      message: inputText,
      fromUser: true,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/sendMessage", {
        method: "POST",
        body: JSON.stringify(message),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data.message);  // Log the response message from the server
      onMessageReceived(data.message);  // Pass the message to the parent component
    } catch (error) {
      console.error("Failed to send message:", error);
    }
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
