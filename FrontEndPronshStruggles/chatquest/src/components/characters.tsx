import React from 'react';

interface TextProps {
    text: string;
}

const TextComponent: React.FC<TextProps> = ({ text }) => {
    return <div>{text}</div>;
};

export default TextComponent;
