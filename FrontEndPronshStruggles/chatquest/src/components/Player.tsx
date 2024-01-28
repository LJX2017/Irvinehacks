// AudioPlayer.tsx
"use client";
import React, { useState, useEffect } from "react";
import textToSpeech from "./AudioPlayer"; // Assuming you have the textToSpeech function implemented

interface AudioPlayerProps {
    message: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ message }) => {
    const [audioURL, setAudioURL] = useState<string | null>(null);

    const handleAudioFetch = async () => {
        console.log("Fetching audio...");
        try {
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
        }
    };

    useEffect(() => {
        handleAudioFetch();
    }, [message]);

    useEffect(() => {
        return () => {
            if (audioURL) {
                URL.revokeObjectURL(audioURL);
            }
        };
    }, [audioURL]);

    return (
        <div>
            {audioURL && (
                <audio autoPlay controls>
                    <source src={audioURL} type="audio/mpeg" />
                </audio>
            )}
        </div>
    );
};

export default AudioPlayer;