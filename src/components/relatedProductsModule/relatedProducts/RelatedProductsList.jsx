import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Card from '../shared/Card';

function RelatedProductsList({ currentProduct }) {
  const [productsList, setProductsList] = useState([]);

  console.log(currentProduct);

  useEffect(() => {
    axios.get('/products')
      .then((response) => {
        setProductsList(response.data);
      });
  }, []);

  return (
    <div>
      <h2>Products List</h2>
      {productsList.map((element) => <Card product={element} />)}
    </div>
  );
}

export default RelatedProductsList;
