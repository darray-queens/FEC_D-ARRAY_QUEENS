import React from 'react';
import styled from 'styled-components';

import { Grid, Row } from '../shared/containers';

const { useState } = React;

function Images({ styleImages, mainImage, changeMainImage }) {
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const handleNext = () => {
    if (mainImageIndex >= styleImages.length - 1) {
      setMainImageIndex(0);
    } else {
      setMainImageIndex(mainImageIndex + 1);
    }
  };

  const handlePrev = () => {
    if (mainImageIndex <= 0) {
      setMainImageIndex(styleImages.length - 1);
    } else {
      setMainImageIndex(mainImageIndex - 1);
    }
  };

  return (
    <GalleryContainer>
      <MenuGrid>
        {styleImages.map((image, index) => (
          <Row key={image.thumbnail_url}>
            <button
              name="galleryThumbnail"
              type="button"
              onClick={(e) => changeMainImage(styleImages[e.target.dataset.index].url)}
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
      </MenuGrid>
      <MainImageContainer>
        {styleImages.map((image, index) => (
          <MainImg data-index={index} alt="Clothing" src={image.url} isActive={index === mainImageIndex} />
        ))}
        <Prev onClick={handlePrev}>&#10094;</Prev>
        <Next onClick={handleNext}>&#10095;</Next>
      </MainImageContainer>
    </GalleryContainer>
  );
}

const MainImageContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
`;

const GalleryContainer = styled.div`
  position: relative;
  background: #d3d3d3;
  height: 450px;
  min-width: 480px;
`;

const MainImg = styled.img`
  position: absolute;
  display: ${(props) => (props.isActive ? 'flex' : 'none')};
  height: 100%;
  min-width: 100%;
  object-fit: contain;
  transition: 1s cubic-bezier(0.39, 0.575, 0.565, 1);
`;

const MenuGrid = styled(Grid)`
  position: absolute;
  z-index: 1;
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
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
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
  right: 0;
  border-radius: 3px 0 0 3px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

export default Images;
