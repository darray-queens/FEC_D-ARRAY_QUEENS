import React from 'react';
import styled from 'styled-components';

import { Row, Col } from '../shared/containers';

const DescriptionRow = styled(Row)`
  align-items: center;
  padding-top: 20px;
  max-width: 1075px;
  `;

const DescriptionCol = styled(Col)`
  min-width: 480px;
  margin-right: 20px;
`;

const FeatureCol = styled(Col)`
  align-self: flex-start;
  font-size: 14px;
  font-weight: bold;
`;

const LineCol = styled(Col)`
  background: #d3d3d3;
  height: 80%;
  width: 2px;
`;

function ProductDescription({ description, features }) {
  let featureKey = 0;

  return (
    <DescriptionRow>
      <DescriptionCol size={3}>
        <p>{description}</p>
      </DescriptionCol>
      <LineCol />
      <FeatureCol size={1}>
        <ul>
          {features && features.map((details) => {
            featureKey += 1;
            const text = `${details.feature} - ${details.value}`;
            return (
              <li key={`feature #${featureKey}`}>
                {text}
              </li>
            );
          })}
        </ul>
      </FeatureCol>
    </DescriptionRow>
  );
}

export default ProductDescription;
