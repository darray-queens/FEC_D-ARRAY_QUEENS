import React, { useState } from 'react';
import './styles.css';

function QuestionModal({ isOpen, onRequestClose, productName }) {
  const [questionInput, setQuestionInput] = useState('');
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
      question: questionInput,
      nickname: nicknameInput,
      email: emailInput,
    });
    // Here you would typically send the question to the server
    onRequestClose(); // Close the modal upon submission
  };

  return isOpen ? (
    <div className="modal-overlay" onClick={onRequestClose}>
      <div className="form-popup" onClick={(e) => e.stopPropagation()}>
        <h2>Ask Your Question</h2>
        <h3>
          About the
          {productName}
        </h3>
        <form onSubmit={handleSubmit} className="form-container">
          <textarea id="question-input" aria-label="Your Question" placeholder="Your Question *" value={questionInput} onChange={(e) => setQuestionInput(e.target.value)} required maxLength="1000" />
          <input type="text" id="nickname-input" aria-label="Your Nickname" placeholder="What is your nickname *" value={nicknameInput} onChange={(e) => setNicknameInput(e.target.value)} required maxLength="60" />
          <input type="email" id="email-input" aria-label="Your Email" placeholder="Your email *" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} required maxLength="60" />
          <button type="submit" className="btn">Submit question</button>
          <button type="button" className="btn cancel" onClick={onRequestClose}>Close</button>
        </form>
      </div>
    </div>
  ) : null;
}

export default QuestionModal;
