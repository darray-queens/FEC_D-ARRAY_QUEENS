import React from 'react';

function ProductInfo({ product, style }) {
  const { category, name } = product;

  let priceText = <h5>{style.original_price}</h5>;

  if (style.sale_price) {
    priceText = (
      <>
        <h5 style={{ color: 'red' }}>{style.sale_price}</h5>
        <h5 style={{ textDecoration: 'line-through' }}>{style.original_price}</h5>
      </>
    );
  }

  return (
    <div>
      <h5>{category}</h5>
      <h1>{name}</h1>
      {priceText}
    </div>
  );
}

export default ProductInfo;
