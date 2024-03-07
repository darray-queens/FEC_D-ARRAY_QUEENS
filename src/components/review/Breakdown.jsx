import React from 'react';

import axios from 'axios';

import styled from 'styled-components';

import AverageStars from '../shared/AverageStars';

import Bar from './Bar';

import { Row, Col } from '../shared/containers';

const { useState, useEffect } = React;

function Breakdown({ currentProduct }) {
  const [average, setAverage] = useState(0);
  const [recommendPercent, setRecommendPercent] = useState(0);

  useEffect(() => {
    let total = 0;
    let count = 0;
    let Rec = 0;
    let totalRec = 0;

    if (currentProduct && currentProduct.id) {
      const productId = currentProduct.id;
      axios.get(`/reviews/meta?product_id=${productId}`)
        .then((response) => {
          if (response.data.ratings !== undefined) {
            if (Object.prototype.hasOwnProperty.call(response.data.ratings, '1')) {
              Object.keys(response.data.ratings).forEach((key) => {
                total += response.data.ratings[key] * Number.parseInt(key, 10);
                count += Number.parseInt(response.data.ratings[key], 10);
              });
            }

            if (count !== 0) {
              setAverage(Math.round((total / count) * 4) / 4);
            }
          }
          if (response.data.recommended !== undefined) {
            if (Object.prototype.hasOwnProperty.call(response.data.recommended, 'true')) {
              Object.keys(response.data.recommended).forEach((key) => {
                totalRec += Number.parseInt(response.data.recommended[key], 10);
              });
              Rec += Number.parseInt(response.data.recommended.true, 10);
            }

            if (totalRec !== 0) {
              setRecommendPercent(Math.round((Rec / totalRec) * 100));
            }
          }
        })
        .catch((err) => {
          console.error('failed to set ratings: ', err);
        });
    }
  }, [currentProduct]);
  return (
    <div>
      <Container>
        <StylesB>
          {average}
        </StylesB>
        {' '}
        <StarsWrapper>
          <AverageStars currentProduct={currentProduct} />
        </StarsWrapper>
      </Container>
      <StylesRow>
        {recommendPercent}
        % of reviews recommend this product
      </StylesRow>
      <Bar percent={0.50} />
    </div>
  );
}

const Container = styled.div`
  display: flex;
  align-items: flex-start;
`;

const StylesB = styled.b`
  font-size: 70px;
  font-weight: 550;
`;

const StylesRow = styled(Row)`
  margin-top: 15px;
`;

const StarsWrapper = styled(Col)`
  margin-top: 15px;
  margin-left: 20px;
`;

const RightCol = styled(Col)`
  text-align: right
`;

const StylesCol = styled(Col)`
  margin-right: 5px;
  margin-bottom: 5px;
  padding: 5px;
  border: 1px solid rgb(48,48,48);
  background: rgb(232,232,232);
  &: hover {
    background: rgb(224,224,224);
    border-color: rgb(16,16,16);
  }
`;

const StylesButton = styled.button`
  padding: 10px;
  margin-top: 10px;
  margin-bttom: 10px;
  margin-right: 10px;
`;

export default Breakdown;
