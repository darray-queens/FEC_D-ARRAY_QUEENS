import React from 'react';
import { FaRegStar } from 'react-icons/fa';
import styled from 'styled-components';

const StyledStar = styled(FaRegStar)`
  display: inline-block;
  position: relative;
  font-size: 100px;
  color: rgb(221,13,0);
`;

const QuarterStar = styled(StyledStar)`
  position: absolute;
  left: 0;
  top: 0;
  width: 25%;
  overflow: hidden;
  color: rgb(255,136,0);
`;

const HalfStar = styled(StyledStar)`
  position: absolute;
  left: 0;
  top: 0;
  width: 50%;
  overflow: hidden;
  color: rgb(255,136,0);
`;

const ThreeQuarterStar = styled(StyledStar)`
  position: absolute;
  left: 0;
  top: 0;
  width: 75%;
  overflow: hidden;
  color: rgb(255,136,0);
`;

const FullStar = styled(StyledStar)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  overflow: hidden;
  color: rgb(255,136,0);
`;

function Star({ rating }) {
  if (rating >= 0.25 && rating < 0.5) {
    return (
      <StyledStar>
        <QuarterStar />
      </StyledStar>
    );
  }
  if (rating >= 0.5 && rating < 0.75) {
    return (
      <StyledStar>
        <HalfStar />
      </StyledStar>
    );
  }
  if (rating >= 0.75 && rating < 1) {
    return (
      <StyledStar>
        <ThreeQuarterStar />
      </StyledStar>
    );
  }
  return (
    <StyledStar>
      <FullStar />
    </StyledStar>
  );
}

export default Star;
