import React from 'react';
import styled from 'styled-components';
import Star from './Star';
import { Col } from '../shared/containers';

function StarRating({ rating }) {
  const ratingInt = Math.floor(rating);
  const ratingFloat = rating % 1;
  const starsArr = [];
  for (let i = 0; i < ratingInt; i += 1) {
    starsArr.push(
      <StylesCol key={i}>
        <Star rating={1} />
      </StylesCol>,
    );
  }
  if (ratingFloat > 0) {
    starsArr.push(
      <StylesCol key={5}>
        <Star rating={ratingFloat} />
      </StylesCol>,
    );
  }
  if (starsArr.length < 5) {
    while (starsArr.length < 5) {
      starsArr.push(
        <StylesCol key={starsArr.length}>
          <Star rating={0} />
        </StylesCol>,
      );
    }
  }
  return starsArr;
}

const StylesCol = styled(Col)`
  display: inline-block;
`;

export default StarRating;
