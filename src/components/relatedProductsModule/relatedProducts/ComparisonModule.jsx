import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  FloatingModule,
  Grid,
  Row,
  Col,
} from '../../shared/containers';

const StyledGrid = styled(Grid)`
  width: 100%;
  height: 100%;
  display: inline-grid;
  position: relative;
  grid-template-rows: auto auto auto 1fr;
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
    return 'auto';
    // return 'auto'; // can also use fit-content // can also just leave empty
  }};
`;

const StyledCol = styled(Col)`
text-align: ${(props) => props.$textalign || 'left'};
padding: 0px 15px;
height: ${(props) => {
    if (props.height) {
      return `${props.height}%`;
    }
    return 'fit-content';
    // return 'auto'; // can also use fit-content // can also just leave empty
  }};
  width: 100%;
`;

function ComparisonModule({ comparedItems }) {
  const [comparedFeatures, setComparedFeatures] = useState([]);
  const [productFeatures, setProductFeatures] = useState([]);

  const getFeatures = async (items) => {
    const product1Response = await (axios.get(`/products/${items[0].id}`));
    const product2Response = await (axios.get(`/products/${items[1].id}`));
    const allFeatures = [];
    product1Response.data.features.forEach((element) => {
      if (element.value !== null) {
        allFeatures.push(element);
      }
    });
    product2Response.data.features.forEach((element) => {
      if (element.value !== null) {
        if (!allFeatures.includes(element)) {
          allFeatures.push(element);
        }
      }
    });
    setComparedFeatures(allFeatures);
    setProductFeatures([product1Response.data.features.filter((element) => element.value !== null),
      product2Response.data.features.filter((element) => element.value !== null)]);
  };

  useEffect(() => {
    if (comparedItems.length === 2) {
      getFeatures(comparedItems);
      // this is an async/await function.
      // HOW WOULD I HANLDE THIS IF I RETURNED [product1Response.data.features,
      // product2Response.data.features] in getFeatures, and then tried to setState on that result?
    }
  }, [comparedItems]);

  return (
    <FloatingModule>
      <StyledGrid>
        <StyledRow>
          <div>&nbsp;</div>
        </StyledRow>
        <StyledRow>
          <StyledCol>
            <div>
              <b>Comparing</b>
            </div>
          </StyledCol>
        </StyledRow>
        <StyledRow>
          <StyledCol size={1}>
            <p><b>{comparedItems[0].name}</b></p>
          </StyledCol>
          <StyledCol size={1} $textalign="right">
            <p><b>{comparedItems[1].name}</b></p>
          </StyledCol>
        </StyledRow>
        <StyledRow height={100}>
          <StyledCol size={1} height={100} $textalign="right">
            {productFeatures.length === 0 ? '' : comparedFeatures.map((element) => {
              if (productFeatures[0].map((e) => e.value).includes(element.value)) {
                return <div key={element.feature}>✓</div>;
              }
              return <div key={element.feature} color="white">&nbsp;</div>;
            })}
          </StyledCol>
          <StyledCol size={11} height={100} $textalign="center">
            {comparedFeatures.length === 0 ? '' : comparedFeatures.map((element) => (
              <div key={element.feature}>{element.value}</div>
            ))}
          </StyledCol>
          <StyledCol size={1} height={100}>
            {productFeatures.length === 0 ? '' : comparedFeatures.map((element) => {
              if (productFeatures[1].map((e) => e.value).includes(element.value)) {
                return <div key={element.feature}>✓</div>;
              }
              return <div key={element.feature} color="white">&nbsp;</div>;
            })}
          </StyledCol>
        </StyledRow>
      </StyledGrid>
    </FloatingModule>
  );
}

export default ComparisonModule;
