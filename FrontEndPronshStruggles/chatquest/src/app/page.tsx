// HomePage.tsx
"use client";
import React, { useState } from 'react';
import Header from '@/components/Header';
import Image from '@/components/Image';
import TextInput from '@/components/TextInput';
import VoiceInput from '@/components/VoiceInput';
import TextComponent from '@/components/characters';
import Description from '@/components/Description';
import AudioPlayer from '@/components/Player';

const HomePage: React.FC = () => {
  const [apiText, setApiText] = useState<string | null>(null);

  const handleTextInputMessage = (message: string) => {
    setApiText(message);

  };

  return (
    <div>
      <Header />
      <Description />
      <Image link="https://pub-3626123a908346a7a8be8d9295f44e26.r2.dev/generations/d69487cd-1f53-4825-b091-6e96caf1c199-0.png" alt="ChatQuest" />
      <TextInput onMessageReceived={handleTextInputMessage} />
      {apiText && (
        <div>
          <TextComponent text={apiText} />
          <AudioPlayer message={apiText || ""} />
        </div>
      )}
      <VoiceInput />
    </div>
  );
};

export default HomePage;
