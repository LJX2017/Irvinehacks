import React from 'react';

interface ImageProps {
    link: string;
    alt: string;
}

const Image: React.FC<ImageProps> = ({ link, alt }) => {
    return (
        <div className='px-4 my-3 flex justify-center items-center'>
            <img src={link} alt={alt} />
        </div>
    );
};

export default Image;
