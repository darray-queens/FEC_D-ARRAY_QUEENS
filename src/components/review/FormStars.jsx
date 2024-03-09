import React from 'react';
import { FaStar } from 'react-icons/fa';
import styled from 'styled-components';

const { useState } = React;

const StarWrapper = styled.div`
  display: inline-block;
  position: relative;
  font-size: 15px;
  color: rgb(221, 221, 221);
`;

const StyledStar = styled(FaStar)`
  &:hover {
    border: 2px solid;
    border-color: rgb(0, 0, 0, 0);
    border-radius: 50%;
  }bor
`;

function ClickableStar({ index, rating, setRating }) {
  const handleClick = () => {
    setRating(index);
  };

  return <StyledStar onClick={handleClick} style={{ color: index <= rating ? 'rgb(255, 136, 0)' : 'rgb(221, 221, 221)' }} />;
}

function FormStars() {
  const [rating, setRating] = useState(0);

  return (
    <StarWrapper>
      {[1, 2, 3, 4, 5].map((index) => (
        <ClickableStar key={index} index={index} rating={rating} setRating={setRating} />
      ))}
    </StarWrapper>
  );
}

export default FormStars;
