import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import ProductCard from '../shared/ProductCard';
import ComparisonModule from './ComparisonModule';
import scrollButtonClick from '../shared/scrollButtonClick';
import fetchSalePrice from '../shared/fetchSalePrice';
import {
  Grid,
  ProductModuleRow,
  StyledButton,
  Col,
} from '../../shared/containers';

function RelatedProductsList({ currentProduct, setProductId }) {
  const [productsList, setProductsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [comparisonHidden, setComparisonHidden] = useState(true);
  const [comparedItems, setComparedItems] = useState([]);

  const productModuleRef = useRef(null);

  async function fetchProducts() {
    const productsRequest = await axios.get('/products/?count=75')
      .catch((err) => {
        console.error(err);
      });

    console.log(productsRequest, 'AXIOS PRODUCTS/?COUNT75')

    const relatedProducts = productsRequest.data.filter(
      (element) => element.category.toLowerCase().includes(currentProduct.category.toLowerCase())
        || currentProduct.category.toLowerCase().includes(element.category.toLowerCase()),
    ).filter((element) => element.id !== currentProduct.id);

    const salePricePromises = relatedProducts.map(async (element) => {
      const salePrice = await fetchSalePrice(element.id);
      return { id: element.id, salePrice };
    });

    const promisesResolved = await Promise.all(salePricePromises);
    console.log(promisesResolved, 'promisesResolved after map fetchsaleprice')
    const itemsWithSale = promisesResolved.filter((element) => element.salePrice !== null); // [{}]

    console.log(itemsWithSale, 'itemsWithSale')
    // maybe need to refactor this out into a separate function for SOC
    const hash = {};

    itemsWithSale.forEach((element) => {
      hash[element.id] = element.salePrice;
    });

    relatedProducts.forEach((element, index) => {
      if (hash[element.id] !== undefined) {
        relatedProducts[index].salePrice = hash[element.id];
      } else {
        relatedProducts[index].salePrice = undefined;
      }
    });

    console.log(relatedProducts, 'relatedProducts after adding sale price')
    setIsLoading(false);
    setProductsList(relatedProducts);
  }

  useEffect(() => {
    console.log(productsList)
  }, [currentProduct])

  useEffect(() => {
    if (Object.keys(currentProduct).length !== 0) {
      fetchProducts();
    }
  }, [currentProduct]);

  // if two items, show modal
  useEffect(() => {
    if (comparedItems.length === 2) {
      setComparisonHidden(false);
    }
  }, [comparedItems]);

  // attach/remove event listener
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

  // click handlers
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

  return (
    <Grid>
      <h2>Related Products</h2>
      <ProductModuleRow>
        <Col size={1}>
          <StyledButton type="button" onClick={() => scrollButtonClick(productModuleRef.current, 'left')}>&lt;</StyledButton>
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
          <StyledButton type="button" onClick={() => scrollButtonClick(productModuleRef.current, 'right')}>&gt;</StyledButton>
        </Col>
      </ProductModuleRow>
      {comparisonHidden ? <div /> : <ComparisonModule comparedItems={comparedItems} />}
    </Grid>
  );
}

export default RelatedProductsList;
