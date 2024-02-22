"use client"

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

// ----------------------- Voice transcript code

// import React, { useState, useEffect } from 'react';
// import Lottie from 'react-lottie';
// import micAni from '../../lottie-animation/listening.json';
// import { NavBar } from '@/components/NavBar';
// import styles from '../Voice/voice.module.css';

// const VoiceTranscript = () => {
//   // Lottie Animation
//   const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     animationData: micAni,
//     rendererSettings: {
//       preserveAspectRatio: "xMidYMid slice"
//     }
//   };

//   // Voice Transcription
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

//       if (transcript === "initiate") {
//         wake();
//       } else if (transcript === "end process") {
//         end();
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

//   const wake = () => {
//     console.log("Wake word activated");    // Create a new instance of SpeechSynthesisUtterance
//     var message = new SpeechSynthesisUtterance();

//     // Set the text that you want to be spoken
//     message.text = "Hello, how are you today?";

//     // Use the speechSynthesis object to speak the message
//     window.speechSynthesis.speak(message);

//   }

//   // useEffect(() => {
//   //   // Create a new instance of SpeechSynthesisUtterance
//   //   var message = new SpeechSynthesisUtterance();

//   //   // Set the text that you want to be spoken
//   //   message.text = "Hello, how are you today?";

//   //   // Use the speechSynthesis object to speak the message
//   //   window.speechSynthesis.speak(message);
//   // }, []); // Empty dependency array means this effect will only run once after the component mounts


//   const end = () => {
//     console.log("Session Ended");
//   }

//   return (
//     <div>
//       <NavBar/>
//       <h1 className={styles.voiceHead}>QikLearn Vision</h1>
      
//       <div className={styles.animation}>
//         <Lottie 
//           options={defaultOptions} // Pass defaultOptions here
//           height={400}
//           width={400}
//         />
//       </div>

//     </div>
//   );
// };

// export default VoiceTranscript;


// ------------------------------ voice transcript with audio

import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import micAni from '../../lottie-animation/listening.json';
import { NavBar } from '@/components/NavBar';
import styles from '../Voice/voice.module.css';
import { useSpeechSynthesis } from 'react-speech-kit';

const VoiceTranscript = () => {
  // Lottie Animation
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: micAni,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  // Speech Synthesis
  const { speak, supported } = useSpeechSynthesis();
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (!supported) {
      console.error("Speech synthesis not supported by the browser");
      setIsSupported(false);
    }
  }, [supported]);

  // Voice Transcription
  useEffect(() => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      console.error("Speech recognition not supported by the browser");
      return;
    }

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
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
      // Start listening again if not ended by "end process"
      if (!recording) {
        recognition.start();
      }
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
    if (isSupported) {
      speak({ text: "What can I do for you?" });
    }
  }

  const end = () => {
    console.log("Session Ended");
  }

  return (
    <div>
      <NavBar/>
      <h1 className={styles.voiceHead}>QikLearn Vision</h1>
      
      <div className={styles.animation}>
        <Lottie 
          options={defaultOptions} // Pass defaultOptions here
          height={400}
          width={400}
        />
      </div>
      
      {/* Fallback text display */}
      <p>Listening...</p>
      {!isSupported && <p>Speech synthesis is not supported by the browser</p>}
    </div>
  );
};

export default VoiceTranscript;
