import React from 'react';

interface TextProps {
  text: string;
}

const TextComponent: React.FC<TextProps> = ({ text }) => {
  return         <div className='px-4 my-3 flex justify-center items-center'>
  {text}</div>;
};

export default TextComponent;