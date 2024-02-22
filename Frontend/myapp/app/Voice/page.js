"use client"

import axios from 'axios';
// import { useState, useEffect } from 'react';

// const RecordVoice = () => {
//   const [mediaStream, setMediaStream] = useState(null);
//   const [mediaRecorder, setMediaRecorder] = useState(null);
//   const [recording, setRecording] = useState(false);

//   useEffect(() => {
//     if (!mediaRecorder) return;

//     const chunks = [];

//     mediaRecorder.ondataavailable = (e) => {
//       chunks.push(e.data);
//     };

//     mediaRecorder.onstop = () => {
//       const audioBlob = new Blob(chunks, { type: 'audio/wav' });
//       const audioUrl = URL.createObjectURL(audioBlob);
//       const link = document.createElement('a');
//       link.href = audioUrl;
//       link.download = 'recording.wav';
//       document.body.appendChild(link);
//       link.click();
//       URL.revokeObjectURL(audioUrl);
//     };

//     // Cleanup function to release the microphone
//     return () => {
//       if (mediaStream) {
//         mediaStream.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, [mediaRecorder, mediaStream]);

//   const startRecording = () => {
//     if (!mediaStream) return;
//     const recorder = new MediaRecorder(mediaStream);
//     setMediaRecorder(recorder);
//     setRecording(true);
//     recorder.start();
//     console.log('Recording started...');
//   };

//   const stopRecording = () => {
//     if (mediaRecorder && mediaRecorder.state === 'recording') {
//       mediaRecorder.stop();
//       setRecording(false);
//       console.log('Recording stopped...');
//     }
//   };

//   useEffect(() => {
//     // Request access to the user's microphone
//     navigator.mediaDevices.getUserMedia({ audio: true })
//       .then((stream) => {
//         setMediaStream(stream);
//       })
//       .catch((error) => {
//         console.error('Error accessing microphone:', error);
//       });
//   }, []);

//   return (
//     <div>
//       <button onClick={startRecording} disabled={recording}>
//         Start Recording
//       </button>
//       <button onClick={stopRecording} disabled={!recording}>
//         Stop Recording
//       </button>
//       <p>Status: {recording ? 'Recording' : 'Not Recording'}</p>
//     </div>
//   );
// };

// export default RecordVoice;

// -------------------------------- Transcription works perfect

// import React, { useState, useEffect } from 'react';

// const RecordVoice = () => {
//   const [mediaStream, setMediaStream] = useState(null);
//   const [mediaRecorder, setMediaRecorder] = useState(null);
//   const [recording, setRecording] = useState(false);

//   useEffect(() => {
//     if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
//       console.error("Speech recognition not supported by the browser");
//       return;
//     }

//     const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//     recognition.continuous = true;
//     recognition.lang = 'en-US';

//     recognition.onstart = () => {
//       console.log("Voice recognition started");
//     };

//     recognition.onresult = (event) => {
//       const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
//       console.log("Transcript:", transcript);

//       if (transcript === "start recording") {
//         console.log("Recording Started");
//         startRecording();
//       } else if (transcript === "stop recording") {
//         stopRecording();
//         console.log("Recording Stopped");
//       }
//     };

//     recognition.onerror = (event) => {
//       console.error("Speech recognition error:", event.error);
//     };

//     recognition.onend = () => {
//       console.log("Voice recognition ended");
//     };

//     // Start listening
//     recognition.start();

//     // Cleanup function
//     return () => {
//       recognition.stop();
//     };
//   }, []);

//   const startRecording = () => {
//     if (!mediaStream) return;
//     const recorder = new MediaRecorder(mediaStream);
//     setMediaRecorder(recorder);
//     setRecording(true);
//     recorder.start();
//     console.log('Recording started...');
//   };

//   const stopRecording = () => {
//     if (mediaRecorder && mediaRecorder.state === 'recording') {
//       mediaRecorder.stop();
//       setRecording(false);
//       console.log('Recording stopped...');
//     }
//   };

//   useEffect(() => {
//     // Request access to the user's microphone
//     navigator.mediaDevices.getUserMedia({ audio: true })
//       .then((stream) => {
//         setMediaStream(stream);
//       })
//       .catch((error) => {
//         console.error('Error accessing microphone:', error);
//       });
//   }, []);

//   return (
//     <div>
//       <p>Say "Start Recording" to start recording and "Stop Recording" to stop.</p>
//       <p>Status: {recording ? 'Recording' : 'Not Recording'}</p>
//     </div>
//   );
// };

// export default RecordVoice;




import React, { useState, useEffect } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';

const VoiceTranscript = () => {

  const [recording, setRecording] = useState(false);
  const { speak } = useSpeechSynthesis();
  let recognition
  useEffect(() => {
    // axios.get('http://127.0.0.1:5001/voice')
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });


    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      console.error("Speech recognition not supported by the browser");
      return;
    }
   
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      console.log("Voice recognition started");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
      console.log("Transcript:", transcript);

      if (transcript === "initiate") {
        wake();
      } else if (transcript === "end process") {
        end();
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      console.log("Voice recognition ended");
    };

    // Start listening
    recognition.start();

    // Cleanup function
    return () => {
      recognition.stop();
    };
  }, []);

  const wake = () => {
    console.log("Wake word activated");

    axios.get('http://127.0.0.1:5001/voice')
    .then(function (response) {
      console.log(response);

      


    })
    .catch(function (error) {
      console.log(error);
    });

  }


  const end = () => {
    console.log("Session Ended");
  }

  return (
    <div>
      <p>Say "Start Recording" to start recording and "Stop Recording" to stop.</p>
      <p>Status: {recording ? 'Recording' : 'Not Recording'}</p>
    </div>
  );
};

export default VoiceTranscript;



