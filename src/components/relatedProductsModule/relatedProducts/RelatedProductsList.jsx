import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Card from '../shared/Card';
import { Grid, ProductModuleRow } from '../../shared/containers';

function RelatedProductsList({ setProductId }) {
  const [productsList, setProductsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const response = await axios.get('/products')
        .catch((err) => console.error(err));
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
    <Grid>
      <h2>Products List</h2>
      <ProductModuleRow>
        {productsList.map((element) => (
          <Card
            key={element.id}
            product={element}
            setProductId={setProductId}
          />
        ))}
      </ProductModuleRow>
    </Grid>
  );
}

export default RelatedProductsList;
