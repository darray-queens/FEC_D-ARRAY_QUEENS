import React from 'react';
import styled from 'styled-components';
import FormStars from './FormStars';

const { useState } = React;

import { Row, Col } from '../shared/containers';

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

const StylesP = styled.p`
  margin-top: auto;
  margin-left: 10px;
`;

function ReviewForm({ closeModal, currentProduct }) {
  const [formRating, setFormRating] = useState(null);
  const [recommend, setRecommend] = useState(true);

  const handleRecommendChange = (event) => {
    const { value } = event.target;
    setRecommend(value === 'Yes');
    console.log(recommend)
  };

  return (
    <ModalContainer>
      <ModalContent>
        <h2>Write Your Review</h2>
        <h3>
          About the
          {' '}
          {currentProduct.name}
        </h3>
        <Row>
          <Col>
            <FormStars formRating={formRating} setFormRating={setFormRating} />
            *
          </Col>
          <Col>
            {' '}
            {formRating === 1 && <StylesP>Poor</StylesP>}
            {formRating === 2 && <StylesP>Fair</StylesP>}
            {formRating === 3 && <StylesP>Average</StylesP>}
            {formRating === 4 && <StylesP>Good</StylesP>}
            {formRating === 5 && <StylesP>Great</StylesP>}
          </Col>
        </Row>
        <fieldset>
          <legend>Do you recommend this product? *</legend>
          <div>
            <input type="radio" id="yes" name="recommendation" value="Yes" checked={recommend} onChange={handleRecommendChange} />
            <label htmlFor="yes">Yes</label>
          </div>

          <div>
            <input type="radio" id="no" name="recommendation" value="No" checked={!recommend} onChange={handleRecommendChange} />
            <label htmlFor="no">No</label>
          </div>
        </fieldset>
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

export default ReviewForm;
