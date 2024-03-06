import React from 'react';
import styled from 'styled-components';
import { FloatingModule, Grid, Row, Col } from '../../shared/containers';

const StyledGrid = styled(Grid)`
  width: 100%;
  height: 100%;
  display: inline-grid;
  position: relative;
  grid-template-rows: auto auto 1fr;
  border: 1px solid grey;
`;

const StyledRow = styled(Row)`
flex-direction: row;
flex-wrap: nowrap;
width: 100%;
height: ${(props) => {
    if (props.height) {
      return `${props.height}%`;
    }
    // return 'auto'; // can also use fit-content // can also just leave empty
  }};
`;

const StyledCol = styled(Col)`
text-align: ${(props) => props.$textalign || 'left'};
border: 1px solid red;
height: ${(props) => {
    if (props.height) {
      return `${props.height}%`;
    }
    // return 'auto'; // can also use fit-content // can also just leave empty
  }};
`;

function ComparisonModule({ comparedItems }) {
  return (
    <FloatingModule>
      <StyledGrid>
        <StyledRow>
          <h4>Comparing</h4>
        </StyledRow>
        <StyledRow>
          <StyledCol size={1}>
            <h4>{comparedItems[0].name}</h4>
          </StyledCol>
          <StyledCol size={1} $textalign="right">
            <h4>{comparedItems[1].name}</h4>
          </StyledCol>
        </StyledRow>
        <StyledRow height={100}>
          <StyledCol size={1} height={100}>
            hi
          </StyledCol>
          <StyledCol size={11} height={100}>
            hi
          </StyledCol>
          <StyledCol size={1} height={100}>
            hi
          </StyledCol>
        </StyledRow>
      </StyledGrid>
    </FloatingModule>
  );
}

export default ComparisonModule;
