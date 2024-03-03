import React from 'react';
import axios from 'axios';

import ProductInfo from './ProductInfo';
import StarRating from './StarRating';
import ProductDescription from './ProductDescription';
import Images from './Images';

const { useState, useEffect } = React;

function Overview(props) {
  const { currentProduct } = props;

  // useEffect(() => {
  //   if (Object.keys(productDetails).length > 0) {
  //     setProductDetails(productDetails);
  //   }
  // }, [currentProduct]);

  return (
    <div>
      <main>
        <Images />
      </main>
      <aside>
        <StarRating />
        <ProductInfo currentProduct={currentProduct} />
      </aside>
      <ProductDescription
        description={currentProduct.description}
        features={currentProduct.features}
      />
    </div>
  );
}

export default Overview;
