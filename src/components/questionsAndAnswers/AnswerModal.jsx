import React, { useState } from 'react';
import './styles.css';

function AnswerModal({ isOpen, onRequestClose, productName, questionBody }) {
  const [answerInput, setAnswerInput] = useState('');
  const [nicknameInput, setNicknameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');

  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      answer: answerInput,
      nickname: nicknameInput,
      email: emailInput,
    });
    onRequestClose();
  };

  return isOpen ? (
    <div className="modal-overlay" onClick={onRequestClose}>
      <div className="form-popup" onClick={(e) => e.stopPropagation()}>
        <h2>Submit your Answer</h2>
        <h3>{productName}: {questionBody}</h3>
        <form onSubmit={handleSubmit} className="form-container">
          <textarea id="answer-input" aria-label="Your Answer" placeholder="Your Answer *" value={answerInput} onChange={(e) => setAnswerInput(e.target.value)} required maxLength="1000" />
          <input type="text" id="nickname-input" aria-label="Your Nickname" placeholder="What is your nickname *" value={nicknameInput} onChange={(e) => setNicknameInput(e.target.value)} required maxLength="60" />
          <input type="email" id="email-input" aria-label="Your Email" placeholder="Your email *" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} required maxLength="60" />
          <button type="submit" className="btn">Submit answer</button>
          <button type="button" className="btn cancel" onClick={onRequestClose}>Close</button>
        </form>
      </div>
    </div>
  ) : null;
}

export default AnswerModal;
