import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

function QuestionModal({
  isOpen, onRequestClose, productName, questions,
  setQuestions, currentProduct, refreshQuestions, currentPage,
}) {
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

    try {
      await axios.post(`/qa/questions?product_id=${currentProduct.id}`, questionDetails, {
        params: { page: currentPage, count: 5 },
      });

      // Refresh the questions after a short delay (optional)
      await refreshQuestions(currentProduct);

      await onRequestClose(); // Close the modal upon successful submission
    } catch (error) {
      console.error('Error submitting question:', error);
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
        {questions.map((question) => (
          <div key={question.id}>
            <p>{question.body}</p>
            {/* Add any additional information related to the question */}
          </div>
        ))}
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
