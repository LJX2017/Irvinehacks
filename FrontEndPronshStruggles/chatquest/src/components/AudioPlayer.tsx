// textToSpeech.ts
import axios, { AxiosRequestConfig, ResponseType } from "axios";

const textToSpeech = async (inputText: string) => {
  // Set the API key for ElevenLabs API. Use environment variables in production.
  const API_KEY = "";
  // Set the ID of the voice to be used.
  const VOICE_ID = "21m00Tcm4TlvDq8ikWAM";

  // Set options for the API request.
  const options: AxiosRequestConfig = {
    method: "POST",
    url: `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    headers: {
      accept: "audio/mpeg",
      "content-type": "application/json",
      "xi-api-key": API_KEY,
    },
    data: {
      text: inputText,
    },
    responseType: "arraybuffer" as ResponseType,
  };

  try {
    // Use axios to make the API request
    const response = await axios.request<ResponseType>(options);
    
    // Return the binary audio data
    return response.data;
  } catch (error) {
    console.error("Error making text-to-speech request:", error);
    throw error;
  }
};

export default textToSpeech;
