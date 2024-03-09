import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

function AnswerModal({
  isOpen, onRequestClose, productName, questionBody,
  selectedQuestion, refreshQuestions,
}) {
  const [answerInput, setAnswerInput] = useState('');
  const [nicknameInput, setNicknameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset'; // Reset on unmount
    };
  }, [isOpen]);

  const handleFileChange = (event) => {
    // Limit to 3 photos
    const files = Array.from(event.target.files).slice(0, 3);
    const urls = files.map((file) => URL.createObjectURL(file)); // Create URLs for preview
    const updatedPhotos = [...photos, ...urls]; // Combine existing photos with newly uploaded ones
    setPhotos(updatedPhotos);
  };
  const submitAnswer = async (event) => {
    event.preventDefault();
    const answerDetails = {
      body: answerInput,
      name: nicknameInput,
      email: emailInput,
      photos,
    };

    await axios.post(`/qa/questions/${selectedQuestion.question_id}/answers`, answerDetails);
    refreshQuestions(); // Refresh the questions list to include the new answer
    onRequestClose(); // Close the modal after submission
  };

  return isOpen ? (
    <div className="modal-overlay" onClick={onRequestClose}>
      <div className="form-popup" onClick={(e) => e.stopPropagation()}>
        <h2>Submit your Answer</h2>
        <h3>{productName}: {questionBody}</h3>
        <form onSubmit={submitAnswer} className="form-container">
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
          {/* File input for photos */}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
          {/* Preview uploaded photos */}
          <div className="photo-previews">
            {photos.map((photo, index) => (
              <img key={index} src={photo} alt="Preview" style={{ width: '100px', height: '100px' }} />
            ))}
          </div>
          <button type="submit" className="btn">Submit answer</button>
          <button type="button" className="btn cancel" onClick={onRequestClose}>Close</button>
        </form>
      </div>
    </div>
  ) : null;
}

export default AnswerModal;
