/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Row, Col } from '../shared/containers';
import FormStars from './FormStars';
import Characteristics from './Characteristics';

const { useState } = React;

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
  z-index: 2147483647;
`;

const ModalContent = styled.div`
  background-color: white;
  width: 700px;
  max-height: 95%;
  overflow-y: auto;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  z-index: 2147483647;
`;

const StarRow = styled(Row)`
  border: 0.5px solid grey;
  padding-top: 5px;
  padding-bottom: 5px;
  z-index: 2147483647;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  z-index: 2147483647;
  &:hover {
    color: red;
  }
`;

const StylesP = styled.p`
  margin-top: auto;
  margin-left: 40px;
`;

function ReviewForm({
  closeModal, currentProduct, refresh, setRefresh, factors,
}) {
  const [rating, setRating] = useState(null);
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [bodyCharacterCount, setBodyCharacterCount] = useState(0);
  const [recommend, setRecommend] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState([]);
  const [characteristics, setCharacteristics] = useState({});

  const handleRecommendChange = (event) => {
    const { value } = event.target;
    setRecommend(value === 'Yes');
  };

  const handleBodyChange = (event) => {
    const inputValue = event.target.value;
    setBody(inputValue);
    setBodyCharacterCount(inputValue.length);
  };

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files).slice(0, 5);
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });

    try {
      const response = await axios.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const uploadedPhotos = response.data.urls;

      if (photos.length + uploadedPhotos.length > 5) {
        alert("You can't upload more than 5 images.");
        return;
      }

      uploadedPhotos.forEach((photo) => {
        setPhotos((prevPhotos) => [...prevPhotos, photo]);
      });
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  const submitForm = async (event) => {
    event.preventDefault();
    if (rating === null) {
      alert('Please select a rating');
      return;
    }
    if (body.length < 50) {
      alert('body must be at least 50 characters');
      return;
    }
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
    console.log(formDetails);

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
          <StarRow>
            <Col>
              <p>Overall rating</p>
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
          </StarRow>
          <fieldset>
            <legend>Do you recommend this product? *</legend>
            <div>
              <input type="radio" id="yes" name="recommendation" value="Yes" checked={recommend} onChange={handleRecommendChange} required />
              <label htmlFor="yes">Yes</label>
            </div>

            <div>
              <input type="radio" id="no" name="recommendation" value="No" checked={!recommend} onChange={handleRecommendChange} required />
              <label htmlFor="no">No</label>
            </div>
          </fieldset>
          <Row>
            <Characteristics factors={factors} setCharacteristics={setCharacteristics} />
          </Row>
          <Row>
            <h3>Review summary</h3>
            <input
              type="text"
              id="summary-input"
              placeholder="Example: Best purchase ever!"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              maxLength="60"
            />
          </Row>
          <Row>
            <h3>Review body *</h3>
            <textarea
              value={body}
              onChange={handleBodyChange}
              placeholder="Why did you like the product or not? *"
              required
              maxLength="1000"
            />
            <Row>
              {bodyCharacterCount < 50 ? (
                <span>
                  Minimum required characters left:
                  {50 - bodyCharacterCount}
                </span>
              ) : (
                <span>Minimum reached</span>
              )}
            </Row>
            <Row>
              <h3>Upload your photos</h3>
              {photos.length < 5 && (
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                />
              )}
              <div className="photo-previews">
                {photos.map((photo, index) => (
                  <img key={index} src={photo} alt="Preview" style={{ width: '100px', height: '100px' }} />
                ))}
              </div>
            </Row>
            <Row>
              <h3>What is your nickname? *</h3>
              <input
                type="text"
                id="nickname-input"
                aria-label="Your Nickname"
                placeholder="Example: jackson11!"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength="60"
              />
              <p>For privacy reasons, do not use your full name or email address</p>
            </Row>
            <Row>
              <Row>
                <h3>Your email *</h3>
              </Row>
              <Row>
                <input
                  type="email"
                  id="email-input"
                  aria-label="Your Email"
                  placeholder="Example: jackson11@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  maxLength="60"
                />
              </Row>
              <p>For authentication reasons, you will not be emailed</p>
            </Row>
          </Row>
          <button type="submit" className="btn">Submit answer</button>
          <CloseButton onClick={closeModal}>x</CloseButton>
        </form>
      </ModalContent>
    </ModalContainer>
  );
}

export default ReviewForm;
