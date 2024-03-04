import React from 'react';

function Card({ product }) {
  return (
    <div>
      <div>
        {product.category}
      </div>
      <div>
        {product.name}
      </div>
      <div>
        {product.default_price}
      </div>
      <div>
        ☆☆☆☆☆
      </div>
    </div>
  );
}

export default Card;
