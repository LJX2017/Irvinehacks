import React from 'react';

interface ImageProps {
    link: string;
    alt: string;
}

const Image: React.FC<ImageProps> = ({ link, alt }) => {
    return (
        <div>
            <img src={link} alt={alt} />
        </div>
    );
};

export default Image;
