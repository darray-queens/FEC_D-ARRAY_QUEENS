import React from 'react';
import styled from 'styled-components';

import AverageStars from '../shared/AverageStars';
import { Row } from '../shared/containers';

const ReviewButton = styled.button`
  background: none;
  background-color: none;
  margin-top: -1px;
  margin: none;
  border: none;
  text-align: center;
  &:hover {
    text-decoration: underline;
  }
`;

const ReviewRow = styled(Row)`
  padding-top: 20px;
  align-items: self-start;
  min-width: 100%
`;

function StarRating({ currentProduct, reviewCount }) {
  const scrollToReviews = () => {
    document
      .getElementById('reviews')
      .scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ReviewRow>
      <AverageStars currentProduct={currentProduct} />
      <ReviewButton type="button" onClick={() => scrollToReviews()}>
        {`read ${reviewCount} reviews`}
      </ReviewButton>
    </ReviewRow>
  );
}

export default StarRating;
