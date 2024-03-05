import React from 'react';

import axios from 'axios';

import styled from 'styled-components';

import { Row, Col } from '../shared/containers';

const { useState, useEffect } = React;

function Review({ entry }) {
  return (
    <StylesDiv>
      <Row>
        <Col size={2.5}>
          <p>
            {entry.rating}
            {' '}
            ☆
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
      <Row>
        {entry.photos.map((photo) => (
          <StylesCol key={photo.id}>
            <img src={photo.url} alt={photo.id} width="75px" height="75px" />
          </StylesCol>
        ))}
      </Row>
    </StylesDiv>
  );
}

const StylesCol = styled(Col)`
  flex-basis: 25%;
  margin-right: 0;
  padding-right: 0;
`;

const StylesDiv = styled.div`
  border-bottom: solid rgb(176,176,176);
`;

const RightCol = styled(Col)`
  text-align: right
`;

export default Review;
