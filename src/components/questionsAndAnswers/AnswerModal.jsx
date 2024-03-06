import React, { useState } from 'react';
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
    console.log('Selected question:', selectedQuestion);
    const answerDetails = {
      body: answerInput,
      name: nicknameInput,
      email: emailInput,
      photos: [], // Add if you handle photo uploads
    };
    console.log('answerDetails:', answerDetails);

    await axios.post(`/qa/questions/${selectedQuestion.question_id}/answers`, answerDetails)
      .then((response) => {
        console.log('Answer posted successfully', response.data);
      }).catch((error) => {
        console.error('Error submitting answer:', error);
      });
  };

  return isOpen ? (
    <div className="modal-overlay" onClick={onRequestClose}>
      <div className="form-popup" onClick={(e) => e.stopPropagation()}>
        <h2>Submit your Answer</h2>
        <h3>
          {productName}
          :
          {questionBody}
        </h3>
        <form
          onSubmit={submitAnswer}
          className="form-container"
        >
          <textarea
            id="answer-input"
            aria-label="Your Answer"
            placeholder="Your Answer *"
            value={answerInput}
            onChange={(e) => setAnswerInput(e.target.value)}
            required
            maxLength="1000"
          />
          <input
            type="text"
            id="nickname-input"
            aria-label="Your Nickname"
            placeholder="What is your nickname *"
            value={nicknameInput}
            onChange={(e) => setNicknameInput(e.target.value)}
            required
            maxLength="60"
          />
          <input
            type="email"
            id="email-input"
            aria-label="Your Email"
            placeholder="Your email *"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            required
            maxLength="60"
          />
          <button type="submit" className="btn">Submit answer</button>
          <button type="button" className="btn cancel" onClick={onRequestClose}>Close</button>
        </form>
      </div>
    </div>
  ) : null;
}

export default AnswerModal;
