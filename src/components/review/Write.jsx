import React from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const ModalContent = styled.div`
  background-color: white;
  width: 600px;
  max-height: 95%;
  overflow: auto;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

function Write({ closeModal }) {
  return (
    <ModalContainer>
      <ModalContent>
        <h2>Write a Review</h2>
        <form className="form-container">
          <textarea
            id="answer-input"
            aria-label="Your Answer"
            placeholder="Your Answer *"
            value="haha"
            required
            maxLength="1000"
          />
          <input
            type="text"
            id="nickname-input"
            aria-label="Your Nickname"
            placeholder="What is your nickname *"
            value="dog"
            required
            maxLength="60"
          />
          <input
            type="email"
            id="email-input"
            aria-label="Your Email"
            placeholder="Your email *"
            value="helo"
            required
            maxLength="60"
          />
          <button type="submit" className="btn">Submit answer</button>
          <CloseButton onClick={closeModal}>x</CloseButton>
        </form>
      </ModalContent>
    </ModalContainer>
  );
}

export default Write;
