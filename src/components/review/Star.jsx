import React from 'react';
import { FaStar } from 'react-icons/fa';
import styled from 'styled-components';

const StarWrapper = styled.div`
 display: inline-block;
 position: relative;
 font-size: 15px;
 color: rgb(221, 221, 221);
`;

const StarFill = styled.div`
 font-size: inherit;
 position: absolute;
 left: 0;
 top: 0;
 width: ${(props) => (Math.round(props.width * 4) / 4)}%;
 overflow: hidden;
 color: rgb(255, 136, 0);
`;

function Star({ rating }) {
  return (
    <StarWrapper>
      <FaStar />
      <StarFill width={rating * 100}><FaStar /></StarFill>
    </StarWrapper>
  );
}

export default Star;
