import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Images from './Images';
import StarRating from './StarRating';
import ProductInfo from './ProductInfo';
import Share from './Share';
import Styles from './Styles';
import Selection from './Selection';
import ProductDescription from './ProductDescription';
import Loading from './Loading';

import { Grid, Row, Col } from '../shared/containers';

const { useState, useEffect } = React;

const OverviewGrid = styled(Grid)`
  margin-left: auto;
  margin-right: auto;
  max-width: 1100px;
`;

const ImgCol = styled(Col)`
  margin-right: 20px;
`;

const InfoCol = styled(Col)`
  width: 270px;
  min-width: 270px;
  max-width: 270px;
`;

function Overview({
  currentProduct,
  currentStyle,
  changeCurrentStyle,
  reviewCount,
  mainImageIndex,
  changeMainImageIndex,
  maxThumbIndex,
  changeMaxThumbIndex,
  minThumbIndex,
  changeMinThumbIndex,
  galleryModal,
  toggleGalleryModal,
}) {
  const [styles, setStyles] = useState([]);
  const [currentSku, setCurrentSku] = useState();
  const [isLoading, setIsLoading] = useState(true);

  async function getStyles() {
    const response = await axios.get(`/products/${currentProduct.id}/styles`)
      .catch((error) => console.error(error));

    setStyles(response.data.results);
    changeCurrentStyle(response.data.results[0]);
    changeMainImageIndex(0);
    changeMaxThumbIndex(() => {
      const imageCount = response.data.results[0].photos.length;
      return imageCount > 6 ? 6 : imageCount - 1;
    });
    setCurrentSku();
    setIsLoading(false);
  }

  useEffect(() => {
    if (Object.keys(currentProduct).length > 0) {
      getStyles();
    }
  }, [currentProduct]);

  return (
    <OverviewGrid>
      <Row id="image-info-row">
        <ImgCol size={3}>
          <div>
            {isLoading ? (
              <Loading />
            ) : (
              <Images
                styleImages={currentStyle.photos}
                mainImageIndex={mainImageIndex}
                changeMainImageIndex={changeMainImageIndex}
                maxThumbIndex={maxThumbIndex}
                changeMaxThumbIndex={changeMaxThumbIndex}
                minThumbIndex={minThumbIndex}
                changeMinThumbIndex={changeMinThumbIndex}
                galleryModal={galleryModal}
                toggleGalleryModal={toggleGalleryModal}
              />
            )}
          </div>
        </ImgCol>
        <InfoCol id="info-col" size={1}>
          {reviewCount > 0 && (
            <StarRating currentProduct={currentProduct} reviewCount={reviewCount} />
          )}
          <ProductInfo
            product={currentProduct}
            style={currentStyle}
          />
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <Share
                currentProduct={currentProduct}
                styleImage={styles[0].photos[0].url}
              />
              <Styles
                currentStyles={styles}
                currentStyle={currentStyle}
                changeStyle={changeCurrentStyle}
                changeMainImageIndex={changeMainImageIndex}
                mainImageIndex={mainImageIndex}
              />
              <Selection
                style={currentStyle}
                sku={currentSku}
                changeSku={setCurrentSku}
              />
            </>
          )}
        </InfoCol>
      </Row>
      {currentProduct.description && (
        <Row>
          <ProductDescription
            description={currentProduct.description}
            features={currentProduct.features}
          />
        </Row>
      )}
    </OverviewGrid>
  );
}

export default Overview;
