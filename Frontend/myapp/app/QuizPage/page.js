"use client";
import React, { useEffect, useState } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';
import Image from 'next/image'
import logo from '../../public/logo.png'
import styles from './quizPage.module.css'
import axios from 'axios';
import { jsPDF } from "jspdf";
import { NavBar } from '@/components/NavBar';


function QuizPage() {
  const doc = new jsPDF();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    addResponseMessage('Welcome to this **awesome** chat!');
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      const newMessage = {
        text: inputValue,
        type: 'input',
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };
  const handleFormulaClick = () =>{
    console.log("formula click"); 
    axios.post("http://127.0.0.1:5001/pdf").then(res => {
      console.log(res.data);
      doc.text(res.data, 10, 10);
      doc.save("a4.pdf");
    }).catch(err => {
      console.log(err);
    })
  }
  
  
  return (
    <div>
      {/* Nav Bar */}
      {/* <div className={styles.navbar}>
        <div>
          <Image 
            className={styles.navbar__logo}
            src={logo}
            alt="logo" 
          />
        </div>

        <div className={styles.navbar__menu}>
          <a href="/">Dashboard</a>
          <a href="/QuizPage">Quiz</a>
          <a href="#" onClick={handleFormulaClick}>Formula</a>
          <a href="/Remainders">Remainders</a>
        </div>  
      </div> */}    
      <NavBar/>

      {/* Learn Section */}

      <div className={styles.learn}>
        <div className={styles.learn1}>

          <div className={styles.quizPortal}>
            <h3 className={styles.hintHead}>Quiz</h3><hr color='#4A4A4A' />
            

          </div>

          <div className={styles.hint}>
            <h3 className={styles.hintHead}>Hint</h3><hr color='#4A4A4A' />

            <p className={styles.hintContent}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. It is a long established fact that a. page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. It is a long established fact that a.</p>

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

export default QuizPage