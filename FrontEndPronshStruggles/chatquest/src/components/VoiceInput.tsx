// pages/index.tsx
"use client";
import React, { useState, useRef } from 'react';

const AudioRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [transcription, setTranscription] = useState<string>('');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        setAudioBlob(null);
        const chunks: Blob[] = [];
        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            chunks.push(e.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(chunks, { type: 'audio/wav' });
          setAudioBlob(audioBlob);
          sendVoiceToAPI(audioBlob);
        };

        mediaRecorder.start();
        setIsRecording(true);
      })
      .catch((error) => {
        console.error('Error accessing microphone:', error);
      });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const sendVoiceToAPI = (audioBlob: Blob) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const audioDataUrl = reader.result as string;
      const audioJson = JSON.stringify({ audio: audioDataUrl });
      console.log(audioJson + " " + typeof audioJson);
      fetch('http://127.0.0.1:8000/voice', {
        method: 'POST',
        body: audioJson,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the JSON response with text here
          setTranscription(data.text);
        })
        .catch((error) => {
          console.error('Error sending voice to API:', error);
        });
    };
    reader.readAsDataURL(audioBlob);
  };

  return (
    <div className='px-4 my-3 flex justify-center items-center'>
      <h1>Audio Recorder</h1>
      {isRecording && <p>Recording...</p>}
      <div>
        {audioBlob && (
          <div>
            <audio controls>
              <source src={URL.createObjectURL(audioBlob)} type="audio/wav" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
      <p>Transcription: {transcription}</p>
      <button onClick={startRecording} disabled={isRecording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        Stop Recording
      </button>
    </div>
  );
};

export default AudioRecorder;
