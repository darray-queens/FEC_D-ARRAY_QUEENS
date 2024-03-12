import React from 'react';

import styled from 'styled-components';

import { Row, Col } from '../shared/containers';

import Modal from './Modal';

import StarRating from './StarRating';

import HelpfulButton from './HelpfulButton';

const { useState } = React;

function Review({ entry }) {
  const [modalPhoto, setModalPhoto] = useState(null);
  const [showFullReview, setShowFullReview] = useState(false);

  const clickPhoto = (photo) => {
    setModalPhoto(photo);
  };

  const exitModal = () => {
    setModalPhoto(null);
  };

  const handleShowMore = () => {
    setShowFullReview(true);
  };

  return (
    <StylesDiv>
      <RatingRow>
        <Col size={2.5}>
          <StarRating rating={entry.rating} />
        </Col>
        <RightCol size={2.5}>
          <p>
            {entry.reviewer_name}
            ,
            {' '}
            {new Date(entry.date).toLocaleDateString()}
          </p>
        </RightCol>
      </RatingRow>
      <Row>
        <b>{entry.summary}</b>
      </Row>
      <Row>
        <BodyText>{showFullReview ? entry.body : entry.body.slice(0, 250)}</BodyText>
        {!showFullReview && entry.body.length > 250 && (
          <ShowMoreLink onClick={handleShowMore}>Show more</ShowMoreLink>
        )}
      </Row>
      <StylesRow>
        {entry.photos.map((photo) => (
          <StylesCol key={photo.id} onClick={() => { clickPhoto(photo); }}>
            <img src={photo.url} alt={photo.id} width="75px" height="75px" />
          </StylesCol>
        ))}
      </StylesRow>
      {modalPhoto && <Modal photo={modalPhoto} closeModal={exitModal} />}
      {entry.recommend
        ? (
          <div>
            <span style={{ color: '#00693E' }}><b>✓ </b></span>
            <span>I recommend this product</span>
          </div>
        )
        : <div />}
      <HelpfulButton entry={entry} />
    </StylesDiv>
  );
}

const StylesCol = styled(Col)`
  margin-right: 5px;
  margin-bottom: 5px;
  padding: 5px;
  border: 1px solid rgb(48,48,48);
  background: rgb(232,232,232);
  &: hover {
    background: rgb(224,224,224);
    border-color: rgb(16,16,16);
  }
`;

const RatingRow = styled(Row)`
  margin-top: 10px;
  align-items: center;
`;

const StylesDiv = styled.div`
  border-bottom: solid rgb(176,176,176);
`;

const RightCol = styled(Col)`
  text-align: right
`;

const StylesRow = styled(Row)`
  justify-content: flex-start;
`;

const ShowMoreLink = styled.span`
  color: blue;
  cursor: pointer;
`;

const BodyText = styled.p`
  width: 100%;
  word-wrap: break-word;
`;

export default Review;
