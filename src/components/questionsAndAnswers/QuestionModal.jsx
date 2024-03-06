import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

function QuestionModal({
  isOpen, onRequestClose, productName, currentProduct, refreshQuestions }) {
  const [questionInput, setQuestionInput] = useState('');
  const [nicknameInput, setNicknameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');

  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';
  }

  const submitQuestion = async (event) => {
    event.preventDefault();
    const questionDetails = {
      body: questionInput,
      name: nicknameInput,
      email: emailInput,
      product_id: currentProduct.id,
    };

    await axios.post('/qa/questions', questionDetails);
    onRequestClose(); // Close the modal upon successful submission
    refreshQuestions();
  };

  return isOpen ? (
    <div className="modal-overlay" onClick={onRequestClose}>
      <div className="form-popup" onClick={(e) => e.stopPropagation()}>
        <h2>Ask Your Question</h2>
        <h3>
          About the
          {productName}
        </h3>
        <form onSubmit={submitQuestion} className="form-container">
          <textarea
            id="question-input"
            aria-label="Your Question"
            placeholder="Your Question *"
            value={questionInput}
            onChange={(e) => setQuestionInput(e.target.value)}
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
          <button type="submit" className="btn">Submit question</button>
          <button type="button" className="btn cancel" onClick={onRequestClose}>Close</button>
        </form>
      </div>
    </div>
  ) : null;
}

export default QuestionModal;
