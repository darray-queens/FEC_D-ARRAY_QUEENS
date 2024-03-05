import React, { useState } from 'react';
import './styles.css';

function AnswerModal({
  isOpen,
  onRequestClose,
  productName,
  questionBody,
}) {
  const [answerInput, setAnswerInput] = useState('');
  const [nicknameInput, setNicknameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [photos, setPhotos] = useState([]); // If you plan to handle photo uploads

  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would handle the submission logic, including validation and potentially sending data to a server

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
        <h2>Submit your Answer</h2>
        <h3>{productName}: {questionBody}</h3>
        <form onSubmit={handleSubmit}>
          {/* Textarea for answer input */}
          <input
            id="answer-input"
            aria-label="Your Answer *"
            placeholder="Add your answer here"
            value={answerInput}
            onChange={(e) => setAnswerInput(e.target.value)}
            required
            maxLength="1000"
          />
          {/* Input for nickname */}
          <input
            type="text"
            id="nickname-input"
            aria-label="What is your nickname *"
            placeholder="Add your nickname"
            value={nicknameInput}
            onChange={(e) => setNicknameInput(e.target.value)}
            required
            maxLength="60"
          />
          <p>For privacy reasons, do not use your full name or email address</p>
          {/* Input for email */}
          <input
            type="email"
            id="email-input"
            aria-label="Your email *"
            placeholder="Add Your email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            required
            maxLength="60"
          />
          <p>For authentication reasons, you will not be emailed</p>
          {/* Photo upload logic would go here */}
          <button type="submit">Submit answer</button>
          <button type="button" onClick={onRequestClose}>Close</button>
        </form>
      </div>
    </div>
  );
}

export default AnswerModal;
