import React, { useEffect, useRef, useState } from 'react';
import * as tmImage from '@teachablemachine/image';
import {Button} from '@nextui-org/react';

const WorkingVideo = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [prediction, setPrediction] = useState<string>('');

    useEffect(() => {
        const setupCamera = async () => {
            if (navigator.mediaDevices.getUserMedia) {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                } catch (error) {
                    console.error('Error accessing camera:', error);
                }
            }
        };

        setupCamera();
    }, []);

    const handleButtonClick = async () => {
        if (videoRef.current) {
            const modelURL = 'https://teachablemachine.withgoogle.com/models/KOmzEA6im/model.json'; // Replace with your model URL
            const metadataURL = 'https://teachablemachine.withgoogle.com/models/KOmzEA6im/metadata.json'; // Replace with your metadata URL

            try {
                const model = await tmImage.load(modelURL, metadataURL);
                const prediction = await model.predict(videoRef.current);
                console.log('Prediction:', prediction);

                const highestProbabilityObject = prediction.reduce((prev, current) => (
                    prev.probability > current.probability ? prev : current
                ));
                setPrediction(highestProbabilityObject.className);
            } catch (error) {
                console.error('Error loading or predicting with the model:', error);
            }
        }
    };

    return (
        <div>
            <video ref={videoRef} autoPlay playsInline />
            <Button color="primary" variant="flat" type='submit' className="disable-animation p-3 m-2 rounded" style={{ borderColor: 'blue', borderWidth: '1px', borderStyle: 'solid' }} onClick={handleButtonClick}>Predict</Button>
            <div>{prediction}</div>
        </div>
    );
};

export default WorkingVideo;
