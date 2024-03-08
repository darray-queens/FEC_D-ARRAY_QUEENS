import React from 'react';

import { Grid, Row } from '../shared/containers';

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
          <button
            name="galleryThumbnail"
            type="button"
            style={{
              display: index >= minThumbIndex && index <= maxThumbIndex ? 'inherit' : 'none',
            }}
            onClick={(e) => changeMainImageIndex(Number(e.target.dataset.index))}
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
    </Grid>
  );
}

export default ThumbnailMenu;
