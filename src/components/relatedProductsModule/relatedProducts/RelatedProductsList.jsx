import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Card from '../shared/Card';

function RelatedProductsList({ currentProduct }) {
  const [productsList, setProductsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(currentProduct);

  useEffect(() => {
    async function fetchProducts() {
      const response = await axios.get('/products')
        .catch((err) => console.log(err))
      setIsLoading(false);
      setProductsList(response.data);
    }
    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div>
      <h2>Products List</h2>
      {productsList.map((element) => <Card product={element} />)}
    </div>
  );
}

export default RelatedProductsList;
