import React from 'react';
import styled from 'styled-components';

import MainImage from './MainImage';
import ThumbnailMenu from './ThumbnailMenu';
import {
  PrevThumb,
  NextThumb,
  PrevMain,
  NextMain,
} from './imageNavButtons';

import { Row } from '../shared/containers';

const { useState, useRef } = React;

const GalleryContainer = styled.div`
  position: relative;
  background: #d3d3d3;
  height: 550px;
  min-width: 480px;
  overflow: hidden;
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

const NavContainer = styled(Row)`
  height: 50px;
  width: 50px;
  justify-content: center;
`;

function Images({
  styleImages,
  mainImageIndex,
  changeMainImageIndex,
  maxThumbIndex,
  changeMaxThumbIndex,
  minThumbIndex,
  changeMinThumbIndex,
}) {
  const imageCount = styleImages.length;

  ///
  console.log(maxThumbIndex);
  console.log(minThumbIndex);
  ///

  const [isExpanded, setIsExpanded] = useState(false);
  const [isZoomed, setIsZoomed] = useState();
  const [imageShiftX, _setImageShiftX] = useState();
  const [imageShiftY, _setImageShiftY] = useState();

  const imageShiftXRef = useRef(imageShiftX);
  const setImageShiftX = (newPosition) => {
    imageShiftXRef.current = newPosition;
    _setImageShiftX(newPosition);
  };

  const imageShiftYRef = useRef(imageShiftY);
  const setImageShiftY = (newPosition) => {
    imageShiftYRef.current = newPosition;
    _setImageShiftY(newPosition);
  };

  const handleNextThumb = () => {
    if (maxThumbIndex !== imageCount - 1) {
      changeMinThumbIndex((prevIndex) => prevIndex + 1);
      changeMaxThumbIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevThumb = () => {
    if (minThumbIndex !== 0) {
      changeMinThumbIndex((prevIndex) => prevIndex - 1);
      changeMaxThumbIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNextMain = () => {
    if (mainImageIndex >= imageCount - 1) {
      changeMainImageIndex(0);
    } else {
      changeMainImageIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevMain = () => {
    if (mainImageIndex <= 0) {
      changeMainImageIndex(imageCount - 1);
    } else {
      changeMainImageIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleExpansion = () => {
    if (!isExpanded) {
      document.getElementById('info-col').style.display = 'none';
      setIsExpanded(true);
    } else {
      document.getElementById('info-col').style.display = '';
      setIsExpanded(false);
    }
  };

  const handleImagePosition = (event) => {
    if (document.getElementById('image-container').dataset.zoomed === 'false') {
      return;
    }

    const galleryWidth = document.getElementById('image-container').clientWidth;
    const galleryHeight = document.getElementById('image-container').clientHeight;

    const percentOffsetX = `${100 - ((event.offsetX / galleryWidth) * 100)}%`;
    const percentOffsetY = `${100 - ((event.offsetY / galleryHeight) * 100)}%`;

    setImageShiftX(`${percentOffsetX}%`);
    setImageShiftY(`${percentOffsetY}%`);

    console.log('offsetX ', imageShiftXRef.current);
    console.log('offsetY ', imageShiftYRef.current);
  };

  const handleZoom = () => {
    const galleryWindow = document.getElementById('image-container');

    if (!isZoomed) {
      galleryWindow.addEventListener('mousemove', handleImagePosition, true);
      setIsZoomed(true);
    } else if (isZoomed) {
      galleryWindow.removeEventListener('mousemove', handleImagePosition, true);
      setIsZoomed(false);
    }
  };

  return (
    <GalleryContainer>
      <MenuCol>
        <NavContainer>
          <PrevThumb
            style={{ display: minThumbIndex === 0 ? 'none' : 'inherit' }}
            onClick={handlePrevThumb}
          >
            &#x2c4;
          </PrevThumb>
        </NavContainer>
        <ThumbnailMenu
          styleImages={styleImages}
          minThumbIndex={minThumbIndex}
          maxThumbIndex={maxThumbIndex}
          changeMainImageIndex={changeMainImageIndex}
        />
        <NavContainer>
          <NextThumb
            style={{ display: maxThumbIndex === imageCount - 1 ? 'none' : 'inherit' }}
            onClick={handleNextThumb}
          >
            &#x2c5;
          </NextThumb>
        </NavContainer>
      </MenuCol>
      <MainImage
        isZoomed={isZoomed}
        styleImages={styleImages}
        mainImageIndex={mainImageIndex}
        isExpanded={isExpanded}
        imageShiftX={imageShiftXRef.current}
        imageShiftY={imageShiftYRef.current}
        handleZoom={handleZoom}
        handleExpansion={handleExpansion}
      />
      <PrevMain
        style={{ display: mainImageIndex === 0 ? 'none' : 'inherit' }}
        onClick={handlePrevMain}
      >
        &#10094;
      </PrevMain>
      <NextMain
        style={{ display: mainImageIndex === imageCount - 1 ? 'none' : 'inherit' }}
        onClick={handleNextMain}
      >
        &#10095;
      </NextMain>
    </GalleryContainer>
  );
}

export default Images;
