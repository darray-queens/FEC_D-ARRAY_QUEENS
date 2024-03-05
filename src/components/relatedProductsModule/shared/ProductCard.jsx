import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Card, Container, StarButton, StyledImage } from '../../shared/containers';

function ProductCard({ product, setProductId, className }) {
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

  const cardClick = () => {
    setProductId(product.id);
  };

  const actionButtonClick = () => {
    console.log(product.id);
  };

  return (
    <Card className={className}>
      <Container>
        <StyledImage onClick={cardClick} className="thumbnail" src={thumbnailUrl} alt="" width="300px" />
        <StarButton onClick={actionButtonClick}>★</StarButton>
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
