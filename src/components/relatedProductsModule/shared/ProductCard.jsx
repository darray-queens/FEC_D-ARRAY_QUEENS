import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Card, Container, StarButton, StyledImage } from '../../shared/containers';

function ProductCard({ product, imageClick, actionButtonClick }) {
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  // console.log(product)

  useEffect(() => {
    async function fetchImageUrl() {
      const response = await axios.get(`/products/${product.id}/styles`)
        .catch((err) => console.error(err));
      if (response.data.results[0].photos[0].thumbnail_url !== null) {
        setThumbnailUrl(response.data.results[0].photos[0].thumbnail_url);
      } else {
        setThumbnailUrl('https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png');
      }
    }
    fetchImageUrl();
  }, []);

  return (
    <Card>
      <Container>
        <StyledImage onClick={() => imageClick(product.id)} className="thumbnail" src={thumbnailUrl} alt="" width="300px" />
        <StarButton onClick={() => actionButtonClick(product.id)}>★</StarButton>
      </Container>
      <div>
        {product.category}
      </div>
      <div>
        {product.name}
      </div>
      <div>
        {product.default_price}
      </div>
      <div>
        ☆☆☆☆☆
      </div>
    </Card>
  );
}

export default ProductCard;
