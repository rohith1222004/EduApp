"use client";
import React, { useMemo, useState, useCallback } from 'react';
import {useDropzone} from 'react-dropzone';
import Image from 'next/image'
import styles from './page.module.css'
import logo from '../public/logo.png'
import upload from '../public/upload.png'
import { useRouter } from 'next/navigation'
import YouTube from "react-youtube";

import axios from 'axios';
import { LinearGradient } from 'react-text-gradients'



export default function Home() {

  const router = useRouter()

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, [])

  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({onDrop});

  const [loading, setLoading] = useState(false);
  const [videoLink, setVideoLink] = useState("");

  const [isVideoProcessed, setIsVideoProcessed] = useState(false);

  const handleLinkChange = (e) => {
    const url = e.target.value;
    setVideoLink(url);
  }



  const postVideoLink = () => {
    setLoading(true);
    axios.post("http://127.0.0.1:5001/uploadLink", {
      url: videoLink
    }).then(res => {
      console.log(res.data.status);
      if(res.data.status === "success"){
        setIsVideoProcessed(true);
      }
      setLoading(false);
    }).catch(err => {
      console.log(err);
      setLoading(false);
    })
  }
  

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div>
      {/* Nav Bar */}
      <div className={styles.navbar_wrap}>
      <div className={styles.navbar}>
        <div>
          <Image 
            className={styles.navbar__logo}
            src={logo}
            alt="logo" 
          />
        </div>

        <div className={styles.navbar__menu}>
          <a href="#">Dashboard</a>
          {/* <a href="/Learn">Learn</a> */}
          <a href="/QuizPage">Quiz</a>
          <a href="#" onClick={() =>{console.log("hello")}}>Formula</a>
          {/* <button onClick={() =>{console.log("hello")}}>Formula</button> */}
          <a href="/Remainders">Remainders</a>
        </div>  
      </div>

      {/* Video Link Paste / Upload Section */}
      <div className={styles.videoUpload}>
        <div className={styles.videoUpload__title}>
          {/* <h1>Video Link Repository: Dive Deeper into the Content</h1> */}
          <LinearGradient gradient={['to left', '#17acff ,#ff68f0']} style={{fontSize:80,fontWeight:900}} >
              Dive Deeper into the Content
            </LinearGradient>
        </div>  

        <div className={styles.videoUpload__input}>
          <input className={styles.uploadLink} onChange={handleLinkChange} type="text" placeholder="Paste the Youtube video link here" />

          <div className={styles.videoUpload__or}>
            <hr width="80"/>
            <h3>OR</h3>
            <hr width="80"/>
          </div>

          {/* <div className={styles.videoUpload__upload}>
            <input type="file" />
          </div> */}

          <section className={styles.videoUpload__upload}>
            <div {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps()} />
              <Image 
                className={styles.videoUpload__upload__icon}
                src={upload}
                alt="upload"
              />
              <p>Drag and drop some video files here, or click to select files</p>
            </div>
            <aside>
              {/* <h4>Files</h4> */}
              <ul>{files}</ul>
            </aside>
          </section>

          {
            !isVideoProcessed ?
            <button className={styles.videoUpload__button} onClick={postVideoLink}>
            
            {
              loading ?
              <div>Processing video...</div> : 
              <div>
                    Process Video
              </div>
            }     
            </button> : 

            <button className={styles.videoUpload__button} onClick={router.push(`/Learn/?ytlink=${videoLink}`)}>Ask queries!</button>
          }          
        </div>
      </div>
      </div>
    </div>
  )
}
