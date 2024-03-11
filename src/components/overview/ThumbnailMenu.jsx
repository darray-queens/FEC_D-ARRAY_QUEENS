import React from 'react';
import styled from 'styled-components';

import { Grid, Row } from '../shared/containers';

const ThumbButton = styled.button`
background: none;
background-color: none;
margin-bottom: 6px;
margin-left: 12px;
margin-right: 6px;
padding: none;
border: none;
height: 50px;
width: 50px;
background-size: cover;
&:hover {
  cursor: pointer;
}
`;

const SelectedImg = styled.div`
  position: absolute;
  background: black;
  border-radius: 50%;
  color: white;
  height: 15px;
  width: 15px;
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
  font-size: 8px;
  line-height: 15px;
  transform: translateX(53px) translateY(-7px);
`;

function ThumbnailMenu({
  styleImages,
  minThumbIndex,
  maxThumbIndex,
  changeMainImageIndex,
  mainImageIndex,
}) {
  return (
    <Grid>
      {styleImages.map((image, index) => (
        <Row key={`Style #${index}`}>
          <ThumbButton
            name="galleryThumbnail"
            type="button"
            data-index={index}
            style={{
              display: index >= minThumbIndex && index <= maxThumbIndex ? 'inherit' : 'none',
              backgroundImage: `url(${image.thumbnail_url})`,
            }}
            onClick={(e) => changeMainImageIndex(Number(e.target.dataset.index))}
          />
          {mainImageIndex === index && <SelectedImg>&#10003;</SelectedImg>}
        </Row>
      ))}
    </Grid>
  );
}

export default ThumbnailMenu;
