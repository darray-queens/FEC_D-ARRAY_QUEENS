import React from 'react';
import styled from 'styled-components';

const MainImageContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  height: 100%;
  width: 100%;
  justify-content: center;
`;

const MainImg = styled.img`
  cursor: 'pointer';
  position: absolute;
  display: 'flex';
  height: 100%;
  max-width: 100%;
  object-fit: scale-down;
`;

function MainImage({
  styleImages,
  mainImageIndex,
  toggleGalleryModal,
  galleryModal,
}) {
  return (
    <MainImageContainer
      id="image-container"
    >
      <MainImg
        id="main-image"
        key={styleImages[mainImageIndex].url}
        data-index={mainImageIndex}
        style={galleryModal ? { display: 'none' } : {}}
        alt="Clothing"
        src={styleImages[mainImageIndex].url}
        onClick={() => toggleGalleryModal(true)}
      />
    </MainImageContainer>
  );
}

export default MainImage;
