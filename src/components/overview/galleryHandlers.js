import React from 'react';

const { useCallback } = React;

const galleryHandlers = {
  handleNextThumb: (maxIndex, lastIndex, count) => (
    maxIndex !== count - 1 ? lastIndex + 1 : lastIndex
  ),

  handlePrevThumb: (minIndex, lastIndex) => (
    minIndex !== 0 ? lastIndex - 1 : minIndex
  ),

  handleNextMain: (index, lastIndex, count) => (
    index >= count - 1 ? 0 : lastIndex + 1
  ),

  handlePrevMain: (index, lastIndex, count) => (
    index <= 0 ? count - 1 : lastIndex - 1
  ),

  // handleExpansion: (isExpanded) => {
  //   if (!isExpanded) {
  //     // document.getElementById('info-col').style.display = 'none';
  //     setIsExpanded(true);
  //     toggleGalleryModal(true);
  //   } else {
  //     // document.getElementById('info-col').style.display = '';
  //     setIsExpanded(false);
  //   }
  // },

  // onMovement: useCallback((event) => {
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
  // }, []),

  // handleZoom: (isZoomed, handler) => {
  //   const galleryWindow = document.getElementById('image-container');
  //   if (!isZoomed) {
  //     galleryWindow.addEventListener('mousemove', handler);
  //     // setIsZoomed(true);
  //   } else if (isZoomed) {
  //     galleryWindow.removeEventListener('mousemove', handler);
  //     document.getElementById('main-image').style.transform = 'translateX(0) translateY(0)';
  //     // setIsZoomed(false);
  //   }
  // },
};

export default galleryHandlers;
