import React from 'react';
import styled from 'styled-components';

const { useEffect } = React;

const MainImageContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  height: 100%;
  width: 100%;
  justify-content: center;
`;

const MainImg = styled.img`
  cursor: ${(props) => {
    if (props.$zoomed) {
      return 'zoom-out';
    }
    if (props.$expanded) {
      return 'zoom-in';
    }
    return 'pointer';
  }};
  position: absolute;
  display: 'flex';
  ${(props) => (props.$zoomed
    ? `height: 250%;
      max-width: 250%;
      object-fit: cover;`
    : `height: 100%;
      max-width: 100%;
      object-fit: scale-down;`)}
`;

function MainImage({
  isZoomed,
  styleImages,
  mainImageIndex,
  isExpanded,
  imageShiftX,
  imageShiftY,
  handleZoom,
  handleExpansion,
}) {
  let styles = {};
  useEffect(() => {
    styles = { translateX: imageShiftX };
  }, [imageShiftX, imageShiftY]);
  console.log(styles);

  return (
    <MainImageContainer
      id="image-container"
      $zoomed={isZoomed}
      data-zoomed={isZoomed}
    >
      <MainImg
        id="main-image"
        key={styleImages[mainImageIndex].url}
        data-index={mainImageIndex}
        alt="Clothing"
        style={{ translateX: imageShiftX }}
        src={styleImages[mainImageIndex].url}
        onClick={isExpanded ? handleZoom : handleExpansion}
        $expanded={isExpanded}
        $zoomed={isZoomed}
      />
    </MainImageContainer>
  );
}

export default MainImage;
