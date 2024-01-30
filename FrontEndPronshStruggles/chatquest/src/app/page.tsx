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
import WorkingVideo from '@/components/workingVideo';
import { Button } from '@nextui-org/react';

const HomePage: React.FC = () => {
  const [apiText, setApiText] = useState<string | null>(null);
  const [showWorkingVideo, setShowWorkingVideo] = useState(false);

  const handleTextInputMessage = (message: string) => {
    setApiText(message);
  };

  const handleButtonClick = () => {
    setShowWorkingVideo(true);
  };

  return (
    <div className='items-center p-5 mx-80%'>
      <Header />
      <Description />
      <Image link="https://pub-3626123a908346a7a8be8d9295f44e26.r2.dev/generations/d69487cd-1f53-4825-b091-6e96caf1c199-0.png" alt="ChatQuest" />
      <TextInput onMessageReceived={handleTextInputMessage} />
      {apiText && (
        <div>
          <TextComponent text={apiText}/>
          <AudioPlayer message={apiText || ""} />
        </div>
      )}
      <VoiceInput />
      <div className='flex justify-center'>
      <Button color="primary" variant="flat" type='submit' className="disable-animation p-3 m-2 rounded" style={{ borderColor: 'blue', borderWidth: '1px', borderStyle: 'solid' }} onClick={handleButtonClick}>Active Video</Button>
      {showWorkingVideo && <WorkingVideo />}
      </div>
    </div>
  );
};

export default HomePage;
