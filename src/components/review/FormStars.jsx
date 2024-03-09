import React from 'react';
import { FaStar } from 'react-icons/fa';
import styled from 'styled-components';

const StarWrapper = styled.div`
  display: inline-block;
  position: relative;
  font-size: 15px;
`;

const StyledStar = styled(FaStar)`
  &:hover {
    border: 2px solid;
    border-color: rgb(0, 0, 0, 0);
  }
`;

function ClickableStar({ index, rating, setRating }) {
  const handleClick = () => {
    setRating(index);
  };

  return <StyledStar onClick={handleClick} style={{ color: index <= rating ? 'rgb(255, 136, 0)' : 'rgb(221, 221, 221)' }} />;
}

function FormStars({ formRating, setFormRating }) {
  return (
    <StarWrapper>
      {[1, 2, 3, 4, 5].map((index) => (
        <ClickableStar key={index} index={index} rating={formRating} setRating={setFormRating} />
      ))}
    </StarWrapper>
  );
}

export default FormStars;
