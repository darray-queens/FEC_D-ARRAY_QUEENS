import React from 'react';
import styled from 'styled-components';
import { FloatingModule, Row, Col } from '../../shared/containers';

const StyledRow = styled(Row)`
flex-direction: row;
flex-wrap: nowrap;
width: 100%;
height: ${(props) => `${props.height}%`};
`;

const StyledCol = styled(Col)`
width: 50%;
overflow-wrap: break-word;
text-align: ${(props) => props.$textalign || 'left'};
`;

function ComparisonModule({ comparedItems }) {
  return (
    <FloatingModule>
      <StyledRow height={15}>
        <h4>Comparing</h4>
      </StyledRow>
      <StyledRow height={85}>
        <StyledCol size={1}>
          <div>
            <b>{comparedItems[0].name}</b>
          </div>
          {JSON.stringify(comparedItems[0])}
        </StyledCol>
        <StyledCol size={1} $textalign="right">
          <div>
            <b>{comparedItems[1].name}</b>
          </div>
          {JSON.stringify(comparedItems[1])}
        </StyledCol>
      </StyledRow>
    </FloatingModule>
  );
}

export default ComparisonModule;
