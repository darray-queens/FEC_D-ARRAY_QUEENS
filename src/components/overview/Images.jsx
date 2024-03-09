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
  toggleGalleryModal,
}) {
  const imageCount = styleImages.length;

  // const handleExpansion = () => {
  //   if (!isExpanded) {
  //     // document.getElementById('info-col').style.display = 'none';
  //     setIsExpanded(true);
  //     toggleGalleryModal(true);
  //   } else {
  //     // document.getElementById('info-col').style.display = '';
  //     setIsExpanded(false);
  //   }
  // };

  // const onMovement = useCallback((event) => {
  //   const galleryWidth = document.getElementById('image-container').clientWidth;
  //   const galleryHeight = document.getElementById('image-container').clientHeight;
  //   const mainImage = document.getElementById('main-image');
  //   const imageWidth = mainImage.clientWidth;
  //   const imageHeight = mainImage.clientHeight;

  //   const changeX = Math.round(
  //     ((imageWidth / 2) * ((galleryWidth / 2) - event.offsetX)) / (galleryWidth / 2),
  //   );
  //   const changeY = Math.round(
  //     ((imageHeight / 2) * ((galleryHeight / 2) - event.offsetY)) / (galleryHeight / 2),
  //   );

  //   mainImage.style.transform = `translateX(${changeX}px) translateY(${changeY}px)`;
  // }, []);

  // const handleZoom = () => {
  //   const galleryWindow = document.getElementById('image-container');
  //   if (!isZoomed) {
  //     galleryWindow.addEventListener('mousemove', onMovement);
  //     setIsZoomed(true);
  //   } else if (isZoomed) {
  //     galleryWindow.removeEventListener('mousemove', onMovement);
  //     document.getElementById('main-image').style.transform = 'translateX(0) translateY(0)';
  //     setIsZoomed(false);
  //   }
  // };

  return (
    <GalleryContainer>
      <MenuCol>
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
      />
      <PrevMain
        style={{ display: mainImageIndex === 0 ? 'none' : 'inherit' }}
        onClick={() => changeMainImageIndex(
          (prevIndex) => handlePrevMain(mainImageIndex, prevIndex, imageCount),
        )}
      >
        &#10094;
      </PrevMain>
      <NextMain
        style={{ display: mainImageIndex === imageCount - 1 ? 'none' : 'inherit' }}
        onClick={() => changeMainImageIndex(
          (prevIndex) => handleNextMain(mainImageIndex, prevIndex, imageCount),
        )}
      >
        &#10095;
      </NextMain>
    </GalleryContainer>
  );
}

export default Images;
