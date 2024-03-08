import React from 'react';
import styled from 'styled-components';

function IconBar({ characteristic, average }) {
  const iconPosition = ((average - 1) / 4) * 100;
  return (
    <Container>
      <Label>{characteristic}</Label>
      <BarWrapper>
        <Icon left={iconPosition} />
      </BarWrapper>
      <Meaning>
        <span>Too Small</span>
        <span>Perfect</span>
      </Meaning>
    </Container>
  );
}

const Container = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.div`
  margin-bottom: 2px;
`;

const Icon = styled.div`
  width: 0;
  height: 0;
  left: ${(props) => (props.left)}%;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 13px solid #00693E;
  position: absolute;
  top: 0;
`;

const Meaning = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
`;

const BarWrapper = styled.div`
 display: inline-block;
 position: relative;
 width: 200px;
 height: 7px;
 background-color: rgb(221, 221, 221);
`;

export default IconBar;
