// TextInput.tsx
import React, { useState } from "react";
import { Button } from "@nextui-org/react";

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
    <div className='px-4 my-3 flex justify-center items-center'>
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter text..."
        className='bg-black rounded p-3 mx-3' style={{ borderColor: 'red', borderWidth: '1px', borderStyle: 'solid' }}
      />
      <br />
      <br />
      <Button color="primary" variant="flat" type='submit' className="disable-animation p-3 m-2 rounded" style={{ borderColor: 'blue', borderWidth: '1px', borderStyle: 'solid' }}
        onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default TextInput;
