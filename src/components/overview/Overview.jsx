import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import ProductInfo from './ProductInfo';
import StarRating from './StarRating';

const { useState } = React;
function Overview(props) {
  const { currentProduct } = props;
  const [productDetails, setProductDetails] = useState(currentProduct);

  return (
    <div>
      <p>I&apos;m the product overview widget!</p>
      <ProductInfo />
      <StarRating />
    </div>
  );
}

Overview.propTypes = {
  currentProduct: PropTypes.shape.isRequired,
};

export default Overview;
