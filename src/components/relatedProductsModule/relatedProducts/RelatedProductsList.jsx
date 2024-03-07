import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ProductCard from '../shared/ProductCard';
import ComparisonModule from './ComparisonModule';
import { Grid, ProductModuleRow } from '../../shared/containers';

function RelatedProductsList({ currentProduct, setProductId }) {
  const [productsList, setProductsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [comparisonHidden, setComparisonHidden] = useState(true);
  const [comparedItems, setComparedItems] = useState([]);

  async function fetchProducts() {
    const response = await axios.get('/products/?count=50')
      .catch((err) => {
        console.error(err);
      });
    setIsLoading(false);
    setProductsList(
      response.data.filter(
        (element) => element.category.toLowerCase().includes(currentProduct.category.toLowerCase())
          // eslint-disable-next-line comma-dangle
          || currentProduct.category.toLowerCase().includes(element.category.toLowerCase())
      ).filter((element) => element.id !== currentProduct.id),
    );
  }

  useEffect(() => {
    if (Object.keys(currentProduct).length !== 0) {
      fetchProducts();
    }
  }, [currentProduct]);

  useEffect(() => {
    if (comparedItems.length === 2) {
      setComparisonHidden(false);
    }
  }, [comparedItems]);

  useEffect(() => {
    if (!comparisonHidden) {
      const hideComparison = () => {
        setComparisonHidden(true);
        setComparedItems([]);
        document.removeEventListener('click', hideComparison);
      };

      if (comparedItems.length === 2) {
        document.addEventListener('click', hideComparison);
      }
    }
  }, [comparisonHidden]);

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
    if (comparedItems.length < 2) {
      for (let i = 0; i < productsList.length; i += 1) {
        if (productsList[i].id === id) {
          setComparedItems((prevList) => [...prevList, productsList[i]]);
        }
      }
    }
  };

  return (
    <Grid>
      <h2>Related Products</h2>
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
      {comparisonHidden ? <div /> : <ComparisonModule comparedItems={comparedItems} />}
    </Grid>
  );
}

export default RelatedProductsList;
