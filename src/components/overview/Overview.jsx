import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Images from './Images';
import StarRating from './StarRating';
import ProductInfo from './ProductInfo';
import Styles from './Styles';
import Selection from './Selection';
import ProductDescription from './ProductDescription';

import { Grid, Row, Col } from './containers';

const { useState, useEffect } = React;

function Overview(props) {
  const { currentProduct } = props;

  // useEffect(() => {
  //   if (Object.keys(productDetails).length > 0) {
  //     setProductDetails(productDetails);
  //   }
  // }, [currentProduct]);

  return (
    <Grid>
      <Row>
        <Col size={3}>
          <Images />
        </Col>
        <Col size={1}>
          <StarRating />
          <ProductInfo currentProduct={currentProduct} />
          <Styles />
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
