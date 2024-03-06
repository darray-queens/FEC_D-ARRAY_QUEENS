import React from 'react';

import styled from 'styled-components';

import { Row, Col } from '../shared/containers';

import Modal from './Modal';

import Star from './Star';

const { useState } = React;

function Review({ entry }) {
  const [modalPhoto, setModalPhoto] = useState(null);

  const clickPhoto = (photo) => {
    setModalPhoto(photo);
  };

  const exitModal = () => {
    setModalPhoto(null);
  };

  return (
    <StylesDiv>
      <Row>
        <Col size={2.5}>
          <p>
            {entry.rating}
            {' '}
            <Star rating={.25} />
          </p>
        </Col>
        <RightCol size={2.5}>
          <p>
            {entry.reviewer_name}
            ,
            {' '}
            {new Date(entry.date).toLocaleDateString()}
          </p>
        </RightCol>
      </Row>
      <Row>
        <b>{entry.summary}</b>
      </Row>
      <Row>
        <p>{entry.body}</p>
      </Row>
      <StylesRow>
        {entry.photos.map((photo) => (
          <StylesCol key={photo.id} onClick={() => { clickPhoto(photo); }}>
            <img src={photo.url} alt={photo.id} width="75px" height="75px" />
          </StylesCol>
        ))}
      </StylesRow>
      { modalPhoto && <Modal photo={modalPhoto} closeModal={exitModal} /> }
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

const StylesDiv = styled.div`
  border-bottom: solid rgb(176,176,176);
`;

const RightCol = styled(Col)`
  text-align: right
`;

const StylesRow = styled(Row)`
  justify-content: flex-start;
`;

export default Review;
