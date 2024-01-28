import React, { useState, useEffect } from "react";
import textToSpeech from "./AudioPlayer";
import AudioPlayerDisplay from "./AudioPlayerDisplay"; // Assuming you have the textToSpeech function implemented

interface AudioPlayerProps {
    message: string;
  }
  
  const AudioPlayer: React.FC<AudioPlayerProps> = ({ message }) => {
    const [audioURL, setAudioURL] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
  
    useEffect(() => {
      const handleAudioFetch = async () => {
        try {
          setIsLoading(true);
  
          // Revoke any previously existing audio URL
          if (audioURL) {
            URL.revokeObjectURL(audioURL);
          }
  
          const data = await textToSpeech(message);
          const blob = new Blob([data], { type: "audio/mpeg" });
          const url = URL.createObjectURL(blob);
          setAudioURL(url);
        } catch (error) {
          console.error("Error fetching audio:", error);
          setAudioURL(null);
        } finally {
          setIsLoading(false);
        }
      };
  
      handleAudioFetch();
    }, [message]);
  
    return <AudioPlayerDisplay audioURL={audioURL} isLoading={isLoading} />;
  };
  
  export default AudioPlayer;