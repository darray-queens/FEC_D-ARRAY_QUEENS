import React from 'react';
import styled from 'styled-components';

function Bar({ percent }) {
  return (
    <BarWrapper>
      <BarFill width={percent * 100} />
    </BarWrapper>
  );
}

const BarWrapper = styled.div`
 display: inline-block;
 position: relative;
 width: 150px;
 height: 7px;
 background-color: rgb(221, 221, 221);
`;

const BarFill = styled.div`
 position: absolute;
 left: 0;
 top: 0;
 height: 100%;
 width: ${(props) => (Math.round(props.width * 4) / 4)}%;
 overflow: hidden;
 background-color: rgb(255, 136, 0);
`;

export default Bar;
