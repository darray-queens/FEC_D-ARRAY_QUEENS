import React from 'react';

function ProductInfo(props) {
  const { currentProduct } = props;
  const { category, name } = currentProduct;

  return (
    <div>
      <h5>{category}</h5>
      <h1>{name}</h1>
    </div>
  );
}

export default ProductInfo;
