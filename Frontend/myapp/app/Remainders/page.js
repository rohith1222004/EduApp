"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import logo from '../../public/logo.png';
import styles from '../Remainders/remainders.module.css';

function Remainders() {
  const [reminderData, setReminderData] = useState([
    {
      id: 1,
      title: 'Submit Assignment',
      description: 'Dear Students, This is a gentle reminder to submit your Lab Assignment by 5th August 2023. Late submissions will not be accepted. Kindly ensure that you adhere to the guidelines provided and submit your work on time.',
      completed: false,
    },
    {
      id: 2,
      title: 'College Event - Annual Sports Day',
      description: 'Hello Students, Our highly anticipated Annual Sports Day is scheduled for 6th August 2023 at Auditorium. All students are encouraged to participate in various sports and cheer for their teams. Lets make this day memorable with our enthusiasm and sportsmanship.',
      completed: false,
    },
    {
      id: 3,
      title: 'Exam Schedule',
      description: 'Dear Students, The final examination schedule for this semester is now available. Please check the notice board or the college website for the detailed exam timetable. Make sure to prepare well and reach the examination hall on time. Good luck!',
      completed: false,
    },
  ]);

  const handleCancel = (id) => {
    const updatedReminders = reminderData.map(reminder => {
      if (reminder.id === id) {
        return { ...reminder, completed: false };
      }
      return reminder;
    });
    setReminderData(updatedReminders);
  };

  const handleCompleted = (id) => {
    const updatedReminders = reminderData.map(reminder => {
      if (reminder.id === id) {
        return { ...reminder, completed: true };
      }
      return reminder;
    });
    setReminderData(updatedReminders);
  };

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
          <a href="#">Formula</a>
          <a href="/Remainders">Remainders</a>
        </div>  
    </div>     

    {/* Remainders */}
    <div className={styles.remaindersDiv}>
        <div className={styles.remaindersDiv__title}>
          <h1>Remainders</h1>
        </div>

        <div className={styles.remainderCards}>
            <div className={styles.remainderCards}>
                {reminderData.map(reminder => (
                    <div key={reminder.id} className={styles.remainderCard}>
                    <div className={styles.remainderCard__title}>
                        <h2>{reminder.title}</h2>
                        <p>{reminder.description}</p>
                    </div>
                    <div className={styles.remainderCard__button}>
                        {/* Show buttons if not completed */}
                        {!reminder.completed && (
                        <>
                            <button className={styles.cancelButton} onClick={() => handleCancel(reminder.id)}>
                            Cancel
                            </button>
                            <button className={styles.completedButton} onClick={() => handleCompleted(reminder.id)}>
                            Completed
                            </button>
                        </>
                        )}

                        {/* Show completed text in green color if completed */}
                        {reminder.completed && <p className={styles.completedText} style={{ color: 'lightgreen' }}>Completed</p>}
                    </div>
                    </div>
                ))}
                </div>
            </div>
        </div>


    </div>
  )
}

export default Remainders