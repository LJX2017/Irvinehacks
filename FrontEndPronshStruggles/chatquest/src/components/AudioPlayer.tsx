import React from 'react';
import 'dotenv/config';

const textToSpeech = async (inputText: string) => {
  const API_KEY = "efb24202568e68f18c8a883b4bac6c40";
  const VOICE_ID = "21m00Tcm4TlvDq8ikWAM";
  console.log("inputText", inputText);
  const options = {
    method: "POST",
    headers: {
      accept: "audio/mpeg",
      "content-type": "application/json",
      "xi-api-key": `${API_KEY}`,
    },
    body: JSON.stringify({
      text: inputText,
    }),
  };

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    options
  );

  const audioData = await response.arrayBuffer();
  console.log("audioData", audioData);
  return audioData;
};

export default textToSpeech;