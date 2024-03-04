import React from 'react';
import axios from 'axios';

import Images from './Images';
import StarRating from './StarRating';
import ProductInfo from './ProductInfo';
import Styles from './Styles';
import Selection from './Selection';
import ProductDescription from './ProductDescription';
import Loading from './Loading';

import { Grid, Row, Col } from './containers';

const { useState, useEffect } = React;

function Overview(props) {
  const { currentProduct, scrollMethod } = props;

  const [styles, setStyles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getStyles() {
    const response = await axios.get(`/products/${currentProduct.id}/styles`)
      .catch((error) => console.error(error));
    setStyles(response.data.results);
    setIsLoading(false);
  }

  useEffect(() => {
    if (Object.keys(currentProduct).length > 0) {
      getStyles();
    }
  }, [currentProduct]);

  return (
    <Grid>
      <Row>
        <Col size={3}>
          <Images />
        </Col>
        <Col size={1}>
          <StarRating scrollMethod={scrollMethod} />
          <ProductInfo currentProduct={currentProduct} />
          {isLoading ? (
            <Loading />
          ) : (
            <Styles currentStyles={styles} />
          )}
          <Selection />
        </Col>
      </Row>
      <Row>
        <ProductDescription
          description={currentProduct.description}
          features={currentProduct.features}
        />
      </Row>
    </Grid>
  );
}

export default Overview;
