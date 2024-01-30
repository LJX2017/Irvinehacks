// import React, { useState, useRef } from 'react';

// const VideoComponent: React.FC = () => {
//     const [isRecording, setIsRecording] = useState(false);
//     const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
//     const [capturedInfo, setCapturedInfo] = useState<string>('');

//     const videoRef = useRef<HTMLVideoElement | null>(null);

//     const startRecording = async () => {
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
//             setVideoStream(stream);
//             setIsRecording(true);
//             if (videoRef.current) {
//                 videoRef.current.srcObject = stream;
//             }
//         } catch (error) {
//             console.error('Error accessing camera:', error);
//         }
//     };

//     const stopRecording = () => {
//         setIsRecording(false);
//         if (videoStream) {
//             videoStream.getTracks().forEach(track => track.stop());
//             setVideoStream(null);
//         }
//     };

//     const performFunction = async () => {
//         // Perform some function and update capturedInfo
//         setCapturedInfo('Function performed!');

//         // Example: Send captured frame to backend
//         if (videoRef.current) {
//             const canvas = document.createElement('canvas');
//             canvas.width = videoRef.current.videoWidth;
//             canvas.height = videoRef.current.videoHeight;
//             const context = canvas.getContext('2d');
//             if (context) {
//                 context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
//                 const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

//                 try {
//                     const response = await fetch('http://127.0.0.1:8000/Video', {
//                         method: 'POST',
//                         body: JSON.stringify({ imageData: Array.from(imageData.data) }),
//                         headers: {
//                             'Content-Type': 'application/json'
//                         }
//                     });

//                     if (response.ok) {
//                         const result = await response.text();
//                         console.log('Response from backend:', result);
//                     } else {
//                         console.error('Error sending data to backend:', response.status);
//                     }
//                 } catch (error) {
//                     console.error('Error sending data to backend:', error);
//                 }
//             }
//         }
//     };

//     return (
//         <div>
//             <h1>Video Component</h1>
//             <div style={{ display: isRecording ? 'block' : 'none' }}>
//                 {isRecording && <p>Recording...</p>}
//                 <video ref={videoRef} autoPlay />
//             </div>
//             <br />
//             <p>Captured Info: {capturedInfo}</p>
//             <textarea value={capturedInfo} readOnly />
//             {isRecording ? (
//                 <button onClick={stopRecording}>Stop Recording</button>
//             ) : (
//                 <button onClick={startRecording}>Start Recording</button>
//             )}
//             <button onClick={performFunction}>Perform Function</button>

//         </div>
//     );
// };

// export default VideoComponent;
