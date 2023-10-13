"use client";
import React, { useEffect, useState } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import YouTube from "react-youtube";
import 'react-chat-widget/lib/styles.css';
import Image from 'next/image'
import logo from '../../public/logo.png'
import styles from './learn.module.css'
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

function learn() {
  const searchParams = useSearchParams();
  
  
  const extractVideoId = (link) => {
    //https://www.youtube.com/watch?v=cXlxMP9PU8I  -->  cXlxMP9PU8I
    return link.split('v=')[1];
  }
  
  const linkId = extractVideoId(searchParams.get('ytlink'));

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  

  useEffect(() => {
    addResponseMessage('Welcome to this **awesome** chat!');
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const sendMessageToBot = (message) => {
    axios
      .post('http://localhost:5001/askYTVideoQuery', {
        message,
      })
      .then((response) => {
        console.log('Bot response', response.data);  
        const botResponse = {
          text: response.data,
          type: 'bot',
        };

        
        setMessages((prev) => [...prev, botResponse]);

        console.log('Messages', messages);
      })
      .catch((error) => {
        console.log('Error while sending message to bot', error);
      });
  }

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      const newMessage = {
        text: inputValue,
        type: 'input',
      };
      setMessages([...messages, newMessage]);
      sendMessageToBot(inputValue);
      setInputValue('');
    }
  };
  // formula generation
  function generateFormula() {
    axios.post("http://127.0.0.1:5000/pdf")
    .then(async json =>{
      var pdf = new jsPDF({
          orientation:'p', 
          unit: 'mm',
          format: 'a5',
          putOnlyUsedFonts:true
          });
      await pdf.text(json, 5, 5);
      pdf.save('jsPDF_2Pages.pdf')})
  }


  return (
    <div>
      {/* Nav Bar */}
      <div className={styles.navbar}>
        <div>
          <Image 
            className={styles.navbar__logo}
            src={logo}
            alt="logo" 
          />
        </div>

        <div className={styles.navbar__menu}>
          <a href="/">Dashboard</a>
          {/* <a href="/Learn">Learn</a> */}
          <a href="/QuizPage">Quiz</a>
          <a href="#" onClick={generateFormula()} >Formula</a>
          <a href="/Remainders">Remainders</a>
        </div>  
      </div>

      {/* Learn Section */}

      <div className={styles.learn}>
        <div className={styles.learn1}>

          <div className={styles.videoPlayer}>
            {/* <iframe width="560" height="315" src={link} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}

            <YouTube videoId={linkId} 
            opts={opts} />
         
          </div>

          <div className={styles.transcript}>
            <h3 className={styles.transcriptHead}>Transcript</h3><hr color='#4A4A4A' />

            <p className={styles.transcriptContent}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. It is a long established fact that a. page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. It is a long established fact that a.</p>

          </div>

        </div>

        <div className={styles.learn2}>
          <div className={styles.chatWindow}>
            <h3 className={styles.chatWindowHead}>QuikLearn</h3>
            <hr color='#4A4A4A' />

            <div className={styles.chatArea}>
              {/* Display Input and Output Messages */}
              {messages.map((message, index) => (
                <div key={index} className={styles.chatArea__message}>
                  <p className={message.type === 'input' ? styles.chatArea__messageInput : styles.chatArea__messageOutput}>
                    {message.text}
                  </p>
                </div>
              ))}
            </div>

            <div className={styles.sendMessage}>
              <input
                className={styles.sendMessage__input}
                type="text"
                placeholder="Type your message here"
                value={inputValue}
                onChange={handleInputChange}
              />
              <button className={styles.sendMessage__button} onClick={handleSendMessage}>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default learn