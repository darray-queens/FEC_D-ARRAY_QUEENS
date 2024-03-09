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
  const salePrice = style.sale_price;

  return (
    <div>
      <Category>{category}</Category>
      <ProductName>{name}</ProductName>
      <Row>
        {salePrice && (
          <SaleText>{`$${style.sale_price}`}</SaleText>
        )}
        <h4 style={salePrice && { textDecoration: 'line-through' }}>{`$${style.original_price}`}</h4>
      </Row>
    </div>
  );
}

export default ProductInfo;
