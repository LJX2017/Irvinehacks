// HomePage.tsx
"use client";
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Image from '@/components/Image';
import TextInput from '@/components/Textinput';
import VoiceInput from '@/components/VoiceInput';
import TextComponent from '@/components/characters';
import Description from '@/components/Desription';

const HomePage: React.FC = () => {
  const [apiText, setApiText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/send_string');
        const data = await response.json();
        setApiText(data.message);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleTextInputMessage = (message: string) => {
    setApiText(message);
  };

  return (
    <div>
      <Header />
      <Description />
      <Image link="https://pub-3626123a908346a7a8be8d9295f44e26.r2.dev/generations/d69487cd-1f53-4825-b091-6e96caf1c199-0.png" alt="ChatQuest" />
      <TextComponent text={apiText} />
      <TextInput onMessageReceived={handleTextInputMessage} />
      <VoiceInput />
    </div>
  );
};

export default HomePage;
