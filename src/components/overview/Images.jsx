import React from 'react';
import styled from 'styled-components';

import MainImage from './MainImage';
import ThumbnailMenu from './ThumbnailMenu';

import { Row } from '../shared/containers';
import {
  PrevThumb,
  NextThumb,
  PrevMain,
  NextMain,
} from './imageNavButtons';
import galleryHandlers from './galleryHandlers';

const {
  handleNextThumb,
  handlePrevThumb,
  handleNextMain,
  handlePrevMain,
} = galleryHandlers;

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
  galleryModal,
  toggleGalleryModal,
}) {
  const imageCount = styleImages.length;

  return (
    <GalleryContainer>
      <MenuCol style={galleryModal ? { display: 'none' } : {}}>
        <NavContainer>
          <PrevThumb
            style={{ display: minThumbIndex === 0 ? 'none' : 'inherit' }}
            onClick={() => {
              changeMinThumbIndex((prevIndex) => handlePrevThumb(minThumbIndex, prevIndex));
              changeMaxThumbIndex((prevIndex) => handlePrevThumb(minThumbIndex, prevIndex));
            }}
          >
            &#x2c4;
          </PrevThumb>
        </NavContainer>
        <ThumbnailMenu
          styleImages={styleImages}
          minThumbIndex={minThumbIndex}
          maxThumbIndex={maxThumbIndex}
          changeMainImageIndex={changeMainImageIndex}
          mainImageIndex={mainImageIndex}
          galleryModal={galleryModal}
        />
        <NavContainer>
          <NextThumb
            style={{ display: maxThumbIndex === imageCount - 1 ? 'none' : 'inherit' }}
            onClick={() => {
              changeMinThumbIndex(
                (prevIndex) => handleNextThumb(maxThumbIndex, prevIndex, imageCount),
              );
              changeMaxThumbIndex(
                (prevIndex) => handleNextThumb(maxThumbIndex, prevIndex, imageCount),
              );
            }}
          >
            &#x2c5;
          </NextThumb>
        </NavContainer>
      </MenuCol>
      <MainImage
        styleImages={styleImages}
        mainImageIndex={mainImageIndex}
        toggleGalleryModal={toggleGalleryModal}
        galleryModal={galleryModal}
      />
      <PrevMain
        style={{ display: mainImageIndex === 0 || galleryModal ? 'none' : 'inherit' }}
        onClick={() => {
          changeMainImageIndex(
            (prevIndex) => handlePrevMain(mainImageIndex, prevIndex, imageCount),
          );
          if (mainImageIndex - 1 < minThumbIndex) {
            changeMinThumbIndex(
              (prevIndex) => handleNextThumb(maxThumbIndex, prevIndex, imageCount),
            );
            changeMaxThumbIndex(
              (prevIndex) => handleNextThumb(maxThumbIndex, prevIndex, imageCount),
            );
          }
        }}
      >
        &#10094;
      </PrevMain>
      <NextMain
        style={{ display: mainImageIndex === imageCount - 1 || galleryModal ? 'none' : 'inherit' }}
        onClick={() => {
          changeMainImageIndex(
            (prevIndex) => handleNextMain(mainImageIndex, prevIndex, imageCount),
          );
          if (mainImageIndex + 1 > maxThumbIndex) {
            changeMinThumbIndex(
              (prevIndex) => handleNextThumb(maxThumbIndex, prevIndex, imageCount),
            );
            changeMaxThumbIndex(
              (prevIndex) => handleNextThumb(maxThumbIndex, prevIndex, imageCount),
            );
          }
        }}
      >
        &#10095;
      </NextMain>
    </GalleryContainer>
  );
}

export default Images;
