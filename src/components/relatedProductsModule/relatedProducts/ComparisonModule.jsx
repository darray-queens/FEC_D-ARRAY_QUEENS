import axios from 'axios';
import React, { useState, useEffect } from 'react';
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
  const [features, setFeatures] = useState([]);

  const getFeatures = async (items) => {
    const product1Response = await (axios.get(`/products/${items[0].id}`));
    const product2Response = await (axios.get(`/products/${items[1].id}`));
    console.log(product1Response.data.features, product2Response.data.features);
    setFeatures([product1Response.data.features, product2Response.data.features]);
  };

  useEffect(() => {
    if (comparedItems.length === 2) {
      getFeatures(comparedItems);
      // this is an async/await function.
      // HOW WOULD I HANLDE THIS IF I RETURNED [product1Response.data.features,
      // product2Response.data.features] in getFeatures, and then tried to setState on that result?
    }
  }, [comparedItems]);

  // build a single list of all features (don't write duplicates twice)
  // render list

  // for every item in aggr feat list, if item 1 matches, then add check mark else, add empty space
  // for every item in aggr feat list, if item 2 matches, then add check mark else, add empty space

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
            {features.length === 0 ? '' : features[0].map((element) => (
              <div key={element.feature}>✓</div>
            ))}
          </StyledCol>
          <StyledCol size={11} height={100} $textalign="center">
            {features.length === 0 ? '' : features[0].map((element) => (
              <div key={element.feature}>{element.value}</div>
            ))}
            {features.length === 0 ? '' : features[1].map((element) => (
              <div key={element.feature}>{element.value}</div>
            ))}
          </StyledCol>
          <StyledCol size={1} height={100}>
            {features.length === 0 ? '' : features[1].map((element) => (
              <div key={element.feature}>✓</div>
            ))}
          </StyledCol>
        </StyledRow>
      </StyledGrid>
    </FloatingModule>
  );
}

export default ComparisonModule;
