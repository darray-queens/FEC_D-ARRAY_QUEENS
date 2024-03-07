import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ProductCard from '../shared/ProductCard';
import ComparisonModule from './ComparisonModule';
import {
  Grid,
  ProductModuleRow,
  Button,
  Col,
} from '../../shared/containers';

const StyledButton = styled(Button)`
  background: linear-gradient(to right, white 50%, rgba(240, 240, 240, 0) 100%);
  border: none;
  color: black;
  padding: 10px 20px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
`;

function RelatedProductsList({ currentProduct, setProductId }) {
  const [productsList, setProductsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [comparisonHidden, setComparisonHidden] = useState(true);
  const [comparedItems, setComparedItems] = useState([]);

  const productModuleRef = useRef(null);

  async function fetchProducts() {
    const response = await axios.get('/products/?count=150')
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

  useEffect(() => {
    console.log(productsList, 'productlist')
  }, [productsList]);

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
      if (comparedItems.length === 0 || comparedItems[0].id !== id) {
        for (let i = 0; i < productsList.length; i += 1) {
          if (productsList[i].id === id) {
            setComparedItems((prevList) => [...prevList, productsList[i]]);
          }
        }
      }
    }
  };

  const scrollButtonClick = (direction) => {
    if (direction === 'left') {
      productModuleRef.current.scrollLeft -= 310;
    } else {
      productModuleRef.current.scrollLeft += 310;
    }
  };

  return (
    <Grid>
      <h2>Related Products</h2>
      <ProductModuleRow>
        <Col size={1}>
          <StyledButton type="button" onClick={() => scrollButtonClick('left')}>&lt;</StyledButton>
        </Col>
        <Col size={20}>
          <ProductModuleRow ref={productModuleRef} width={90}>
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
        </Col>
        <Col size={1}>
          <StyledButton type="button" onClick={() => scrollButtonClick('right')}>&gt;</StyledButton>
        </Col>
      </ProductModuleRow>
      {comparisonHidden ? <div /> : <ComparisonModule comparedItems={comparedItems} />}
    </Grid>
  );
}

export default RelatedProductsList;
