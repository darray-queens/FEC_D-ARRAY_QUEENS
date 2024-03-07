import React from 'react';
import styled from 'styled-components';

import sampleStyles from './sampleStyles';

import { Row } from '../shared/containers';

const { useState } = React;

function Images({ /* styleImages, */ mainImageIndex, changeMainImageIndex }) {
  const styleImages = sampleStyles;

  const [minThumbIndex, setMinThumbIndex] = useState(0);
  const [maxThumbIndex, setMaxThumbIndex] = useState(6);

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
        <Row>
          <PrevThumb>
            &#x2c4;
          </PrevThumb>
        </Row>
        {styleImages.map((image, index) => (
          <Row key={image.thumbnail_url}>
            <button
              name="galleryThumbnail"
              type="button"
              style={{
                display: index >= minThumbIndex && index <= maxThumbIndex ? 'inherit' : 'none',
              }}
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
        <Row>
          <NextThumb>
            &#x2c5;
          </NextThumb>
        </Row>
      </MenuCol>
      <MainImageContainer>
        <MainImg
          key={styleImages[mainImageIndex].url}
          data-index={mainImageIndex}
          alt="Clothing"
          src={styleImages[mainImageIndex].url}
        />
      </MainImageContainer>
      <PrevMain
        style={{ display: mainImageIndex === 0 ? 'none' : 'inherit' }}
        onClick={handlePrevMain}
      >
        &#10094;
      </PrevMain>
      <NextMain
        style={{ display: mainImageIndex === styleImages.length - 1 ? 'none' : 'inherit' }}
        onClick={handleNextMain}
      >
        &#10095;
      </NextMain>
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
  height: 550px;
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
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const PrevMain = styled.a`
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

const NextMain = styled.a`
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

const PrevThumb = styled.a`
  cursor: pointer;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 3px;
  user-select: none;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const NextThumb = styled.a`
  cursor: pointer;
  width: auto;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  user-select: none;
  border-radius: 3px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

export default Images;
