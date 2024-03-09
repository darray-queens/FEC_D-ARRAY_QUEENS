import React from 'react';
import styled from 'styled-components';

import { Row } from '../shared/containers';

const Category = styled.h4`
  margin: 0;
  padding: 20px 0px 0px 0px;
  text-transform: uppercase;
`;

const ProductName = styled.h1`
  margin: 0;
  padding: 0;
`;

const SaleText = styled.h4`
  color: red;
  margin-right: 10px;
`;

function ProductInfo({ product, style }) {
  const { category, name } = product;

  let priceText = <h4>{`$${style.original_price}`}</h4>;

  if (style.sale_price) {
    priceText = (
      <Row>
        <SaleText>{`$${style.sale_price}`}</SaleText>
        <h4 style={{ textDecoration: 'line-through' }}>{`$${style.original_price}`}</h4>
      </Row>
    );
  }

  return (
    <div>
      <Category>{category}</Category>
      <ProductName>{name}</ProductName>
      {priceText}
    </div>
  );
}

export default ProductInfo;
