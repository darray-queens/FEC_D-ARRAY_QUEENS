import React from 'react';

import axios from 'axios';

import styled from 'styled-components';

import { Row, Col } from '../shared/containers';

const { useState, useEffect } = React;

function Review({ entry }) {
  return (
    <div>
      <Row>
        <Col size={2.5}>
          <p>
            {entry.rating}
            {' '}
            ☆
          </p>
        </Col>
        <Col size={2.5}>
          <p>
            {entry.reviewer_name}
            ,
            {' '}
            {new Date(entry.date).toLocaleDateString()}
          </p>
        </Col>
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
    </div>
  );
}

const StylesCol = styled(Col)`
  flex-basis: 25%;
  margin-right: 0;
  padding-right: 0;
`;

export default Review;
