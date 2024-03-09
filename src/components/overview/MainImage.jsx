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

// const MainImg = styled.img`
//   cursor: ${(props) => {
//     if (props.$zoomed) {
//       return 'zoom-out';
//     }
//     if (props.$expanded) {
//       return 'zoom-in';
//     }
//     return 'pointer';
//   }};
//   position: absolute;
//   display: 'flex';
//   ${(props) => (props.$zoomed
//     ? `height: 250%;
//       max-width: 250%;
//       object-fit: cover;`
//     : `height: 100%;
//       max-width: 100%;
//       object-fit: scale-down;`)}
// `;

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
}) {
  return (
    <MainImageContainer
      id="image-container"
    >
      <MainImg
        id="main-image"
        key={styleImages[mainImageIndex].url}
        data-index={mainImageIndex}
        alt="Clothing"
        src={styleImages[mainImageIndex].url}
        onClick={() => toggleGalleryModal(true)}
      />
    </MainImageContainer>
  );
}

export default MainImage;
