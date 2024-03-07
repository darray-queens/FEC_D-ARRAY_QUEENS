import React from 'react';
import styled from 'styled-components';

import { Grid, Row, Col } from '../shared/containers';

const { useState } = React;

function Images({ styleImages, mainImageIndex, changeMainImageIndex }) {
  const handleNextMain = () => {
    if (mainImageIndex >= styleImages.length - 1) {
      changeMainImageIndex(0);
    } else {
      changeMainImageIndex((previousIndex) => previousIndex + 1);
    }
  };

  const handlePrevMain = () => {
    if (mainImageIndex <= 0) {
      changeMainImageIndex(styleImages.length - 1);
    } else {
      changeMainImageIndex((previousIndex) => previousIndex - 1);
    }
  };

  return (
    <GalleryContainer>
      <MenuCol>
        {styleImages.map((image, index) => (
          <Row key={image.thumbnail_url}>
            <button
              name="galleryThumbnail"
              type="button"
              onClick={(e) => changeMainImageIndex(Number(e.target.dataset.index))}
            >
              <img
                data-index={index}
                alt="The next addition to your wardrobe"
                src={image.thumbnail_url}
                height="50px"
                width="50px"
              />
            </button>
          </Row>
        ))}
      </MenuCol>
      <MainImageContainer>
        <MainImg
          key={styleImages[mainImageIndex].url}
          data-index={mainImageIndex}
          alt="Clothing"
          src={styleImages[mainImageIndex].url}
        />
      </MainImageContainer>
      <Prev
        style={{ display: mainImageIndex === 0 ? 'none' : 'inherit' }}
        onClick={handlePrevMain}
      >
        &#10094;
      </Prev>
      <Next
        style={{ display: mainImageIndex === styleImages.length - 1 ? 'none' : 'inherit' }}
        onClick={handleNextMain}
      >
        &#10095;
      </Next>
    </GalleryContainer>
  );
}

const MainImageContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  height: 100%;
  width: 100%;
  justify-content: center;
`;

const GalleryContainer = styled.div`
  position: relative;
  background: #d3d3d3;
  height: 450px;
  min-width: 480px;
`;

const MainImg = styled.img`
  position: absolute;
  display: 'flex';
  height: 100%;
  max-width: 100%;
  object-fit: scale-down;
  transition: 1s cubic-bezier(0.39, 0.575, 0.565, 1);
`;

const MenuCol = styled(Row)`
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  justify-content: left;
`;

const Prev = styled.a`
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  left: 70px;
  transition: 0.6s ease;
  border-radius: 3px;
  user-select: none;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
  z-index: 2;
`;

const Next = styled.a`
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  user-select: none;
  right: 70px;
  border-radius: 3px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

export default Images;
