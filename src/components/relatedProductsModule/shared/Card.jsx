import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Col } from '../../shared/containers';

function Card({ product }) {
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  useEffect(() => {
    async function fetchImageUrl() {
      const response = await axios.get(`/products/${product.id}/styles`)
        .catch((err) => console.error(err));
      console.log(response.data)
      if (response.data.results[0].photos[0].thumbnail_url !== null) {
        setThumbnailUrl(response.data.results[0].photos[0].thumbnail_url);
      } else {
        setThumbnailUrl('https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png')
      }
    }
    fetchImageUrl();
  }, []);

  return (
    <Col>
      <img src={thumbnailUrl} alt="" width="300px"/>
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
    </Col>
  );
}

export default Card;
