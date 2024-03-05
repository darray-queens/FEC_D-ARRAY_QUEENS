import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ProductCard from '../shared/ProductCard';
import ComparisonModule from './ComparisonModule';
import { Grid, ProductModuleRow } from '../../shared/containers';

function RelatedProductsList({ setProductId }) {
  const [productsList, setProductsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [comparisonHidden, setComparisonHidden] = useState(true);

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

  const imageClick = (id) => {
    setProductId(id);
  };

  const actionButtonClick = (id) => {
    console.log('related prods actionbtn click', id);
    // adds item to comparison array
    // once array is len 2, open up module


  };

  return (
    <Grid>
      <h2>Products List</h2>
      <ProductModuleRow>
        {productsList.map((element) => (
          <ProductCard
            key={element.id}
            product={element}
            setProductId={setProductId}
            actionButtonClick={actionButtonClick}
            imageClick={imageClick}
            textValue="★"
          />
        ))}
      </ProductModuleRow>
      <ComparisonModule />
    </Grid>
  );
}

export default RelatedProductsList;
