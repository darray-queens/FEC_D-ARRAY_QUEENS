import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
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

function ReviewForm({ closeModal, currentProduct, refresh, setRefresh}) {
  const [rating, setRating] = useState(null);
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [recommend, setRecommend] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState([]);
  const [characteristics, setCharacteristics] = useState({});


  const handleRecommendChange = (event) => {
    const { value } = event.target;
    setRecommend(value === 'Yes');
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const formDetails = {
      product_id: currentProduct.id,
      rating,
      summary,
      body,
      recommend,
      name,
      email,
      photos,
      characteristics,
    };

    await axios.post('/reviews', formDetails);
    setRefresh(!refresh);
    closeModal();
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
        <form onSubmit={submitForm} className="form-container">
          <Row>
            <Col>
              <FormStars formRating={rating} setFormRating={setRating} />
              *
            </Col>
            <Col>
              {' '}
              {rating === 1 && <StylesP>Poor</StylesP>}
              {rating === 2 && <StylesP>Fair</StylesP>}
              {rating === 3 && <StylesP>Average</StylesP>}
              {rating === 4 && <StylesP>Good</StylesP>}
              {rating === 5 && <StylesP>Great</StylesP>}
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
          <button type="submit" className="btn">Submit answer</button>
          <CloseButton onClick={closeModal}>x</CloseButton>
        </form>
      </ModalContent>
    </ModalContainer>
  );
}

export default ReviewForm;
