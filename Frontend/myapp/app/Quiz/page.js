"use client";
import React,{useEffect} from 'react'
import Quiz from 'react-quiz-component'
import { quizData } from '@/components/quiz';
import axios from 'axios';
import { NavBar } from '@/components/NavBar';

function quiz() {
  useEffect(() => {
    axios.post('http://127.0.0.1:5001/quiz')
    .then(function (res) {
      console.log(res.data);
      const quizData =  {
        "questions": [
          {
            "question": res[i].question,
            // "question" : "how are you",
            "questionType": "text",
            "answerSelectionType": "single",
            "answers": [
              "this.getState()",
              "this.prototype.stateValue",
              "this.state",
              "this.values"
            ],
            "correctAnswer": "3",
            "messageForCorrectAnswer": "Correct answer. Good job.",
            "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
            "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "point": "20"
          }
        ]
      }

    })
    .catch(function (error) {
      console.log(error);
    })
  });


  return (
    <div>
      <NavBar/>
      <div>
        <Quiz quiz={quizData}/>
      </div>
    </div>
  )
}

export default quiz