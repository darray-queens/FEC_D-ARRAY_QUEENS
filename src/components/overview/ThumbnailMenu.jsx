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

function ThumbnailMenu({
  styleImages,
  minThumbIndex,
  maxThumbIndex,
  changeMainImageIndex,
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
          >
            {/* <img
              data-index={index}
              alt="The next addition to your wardrobe"
              src={image.thumbnail_url}
              height="50px"
              width="50px"
            /> */}
          </ThumbButton>
        </Row>
      ))}
    </Grid>
  );
}

export default ThumbnailMenu;
