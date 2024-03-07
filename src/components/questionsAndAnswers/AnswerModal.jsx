import React, { useState } from 'react';
<<<<<<< HEAD
import axios from 'axios';
import './styles.css';

function AnswerModal({
  isOpen, onRequestClose, productName, questionBody, selectedQuestion,
}) {
  const [answerInput, setAnswerInput] = useState('');
  const [nicknameInput, setNicknameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');

  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';
  }

  const submitAnswer = async (event) => {
    event.preventDefault();
    const answerDetails = {
      body: answerInput,
      name: nicknameInput,
      email: emailInput,
      photos: [],
    };

    await axios.post(`/qa/questions/${selectedQuestion.question_id}/answers`, answerDetails)
      .then(() => {
      }).catch(() => {
      });
  };

  return isOpen ? (
    <div className="modal-overlay" onClick={onRequestClose}>
      <div className="form-popup" onClick={(e) => e.stopPropagation()}>
=======
import './styles.css';

function AnswerModal({
  isOpen,
  onRequestClose,
  productName,
  questionBody,
  answerInput,
  setAnswerInput,
  nicknameInput,
  setNicknameInput,
  emailInput,
  setEmailInput,
}) {
  // const [answerInput, setAnswerInput] = useState('');
  // const [nicknameInput, setNicknameInput] = useState('');
  // const [emailInput, setEmailInput] = useState('');
  // const [photos, setPhotos] = useState([]); // If you plan to handle photo uploads

  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log({
      answer: answerInput,
      nickname: nicknameInput,
      email: emailInput,
      // photos, // Uncomment if handling photos
    });
    // Assuming a successful submission:
    onRequestClose(); // Close modal after submission
  };

  return (
    <div className="modal-overlay" onClick={onRequestClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
>>>>>>> dev
        <h2>Submit your Answer</h2>
        <h3>
          {productName}
          :
          {questionBody}
        </h3>
<<<<<<< HEAD
        <form
          onSubmit={submitAnswer}
          className="form-container"
        >
          <textarea
            id="answer-input"
            aria-label="Your Answer"
            placeholder="Your Answer *"
=======
        <form onSubmit={handleSubmit} className="form-container">
          <textarea
            id="answer-input"
            aria-label="Your Answer *"
            placeholder="Add your answer here"
>>>>>>> dev
            value={answerInput}
            onChange={(e) => setAnswerInput(e.target.value)}
            required
            maxLength="1000"
          />
<<<<<<< HEAD
          <input
            type="text"
            id="nickname-input"
            aria-label="Your Nickname"
            placeholder="What is your nickname *"
=======
          {/* Input for nickname */}
          <input
            type="text"
            id="nickname-input"
            aria-label="What is your nickname *"
            placeholder="Add your nickname"
>>>>>>> dev
            value={nicknameInput}
            onChange={(e) => setNicknameInput(e.target.value)}
            required
            maxLength="60"
          />
<<<<<<< HEAD
          <input
            type="email"
            id="email-input"
            aria-label="Your Email"
            placeholder="Your email *"
=======
          <p>For privacy reasons, do not use your full name or email address</p>
          {/* Input for email */}
          <input
            type="email"
            id="email-input"
            aria-label="Your email *"
            placeholder="Add Your email"
>>>>>>> dev
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            required
            maxLength="60"
          />
<<<<<<< HEAD
          <button type="submit" className="btn">Submit answer</button>
          <button type="button" className="btn cancel" onClick={onRequestClose}>Close</button>
        </form>
      </div>
    </div>
  ) : null;
=======
          <p>For authentication reasons, you will not be emailed</p>
          {/* Photo upload logic would go here */}
          <button type="submit">Submit answer</button>
          <button type="button" onClick={onRequestClose}>Close</button>
        </form>
      </div>
    </div>
  );
>>>>>>> dev
}

export default AnswerModal;
