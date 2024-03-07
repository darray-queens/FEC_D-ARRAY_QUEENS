import React from 'react';
import styled from 'styled-components';

import { Grid, Row } from '../shared/containers';

function Images({ styleImages, mainImage, changeMainImage }) {
  return (
    <ImgContainer>
      <GalleryGrid>
        {styleImages.map((image, index) => (
          <Row key={image.thumbnail_url}>
            <button name="galleryThumbnail" type="button" onClick={(e) => changeMainImage(styleImages[e.target.dataset.index].url)}>
              <img data-index={index} alt="The next addition to your wardrobe" src={image.thumbnail_url} height="50px" width="50px" />
            </button>
          </Row>
        ))}
      </GalleryGrid>
      <MainImg alt="Clothing" src={mainImage} />
    </ImgContainer>
  );
}

const ImgContainer = styled.div`
  position: relative;
  background: #d3d3d3;
  height: 450px;
  min-width: 480px;
`;

const MainImg = styled.img`
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: contain;
`;

const GalleryGrid = styled(Grid)`
  position: absolute;
  z-index: 1;
`;

export default Images;
