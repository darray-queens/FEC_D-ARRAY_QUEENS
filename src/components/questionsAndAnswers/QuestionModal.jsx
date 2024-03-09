import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

function QuestionModal({
  isOpen, onRequestClose, productName, currentProduct, setIsSubmitting, refreshQuestions,
}) {
  const [questionInput, setQuestionInput] = useState('');
  const [nicknameInput, setNicknameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');

  useEffect(() => {
    // Control the body scroll based on the isOpen state
    const handleBodyScroll = isOpen ? 'hidden' : 'unset';
    document.body.style.overflow = handleBodyScroll;

    // Cleanup function to reset overflow when the component unmounts or isOpen changes
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const submitQuestion = async (event) => {
    event.preventDefault();
    setIsSubmitting(true); // Indicate that submission has started

    const questionDetails = {
      body: questionInput,
      name: nicknameInput,
      email: emailInput,
      product_id: currentProduct.id,
    };

    try {
      await axios.post('/qa/questions', questionDetails);
      refreshQuestions();
    } catch (error) {
      console.error('Error submitting question:', error);
    } finally {
      setIsSubmitting(false); // Ensure submission status is reset whether successful or error
      onRequestClose(); // Close the modal upon submission attempt
    }
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
