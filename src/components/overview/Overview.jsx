import React from 'react';
import axios from 'axios';

const { useState } = React;

function Overview(props) {
  const [productDetails, setProductDetails] = useState([]);

  return (
    <div>
      <p>I&apos;m the product overview widget!</p>
    </div>
  );
}

export default Overview;
