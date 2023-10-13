"use client";
import React,{useEffect} from 'react'
import Quiz from 'react-quiz-component'
import axios from 'axios';

function quiz() {
  useEffect(() => {
    axios.post('http://127.0.0.1:5000/quiz')
    .then(function (res) {
      console.log(res.data);
      const quiz =  {
        "questions": [
          {
            "question": res[i].question,
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
    <div>Quiz</div>
  )
}

export default quiz