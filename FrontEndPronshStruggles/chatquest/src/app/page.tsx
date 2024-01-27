import React from 'react';
import Header from '@/components/Header';
import Image from '@/components/Image';
import TextInput from '@/components/Textinput';
import VoiceInput from '@/components/VoiceInput';
import TextComponent from '@/components/characters';

const HomePage: React.FC = () => {
  return (
    <div>
      <Header />
      {/* Add your home page content here */}
      <Image link="https://pub-3626123a908346a7a8be8d9295f44e26.r2.dev/generations/d69487cd-1f53-4825-b091-6e96caf1c199-0.png" alt="ChatQuest" />
      <TextComponent text="Hello" />
      <TextInput />
      <VoiceInput />
    </div>
  );
};

export default HomePage;
