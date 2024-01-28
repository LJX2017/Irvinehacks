import React from "react";

interface AudioPlayerDisplayProps {
  audioURL: string | null;
  isLoading: boolean;
}

const AudioPlayerDisplay: React.FC<AudioPlayerDisplayProps> = ({ audioURL, isLoading }) => {
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        audioURL && (
          <audio autoPlay controls>
            <source src={audioURL} type="audio/mpeg" />
          </audio>
        )
      )}
    </div>
  );
};

export default AudioPlayerDisplay;
