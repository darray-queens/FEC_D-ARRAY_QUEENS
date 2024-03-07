import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRating from '../review/StarRating';

function AverageStars({ currentProduct }) {
  const [ratings, setRatings] = useState({});
  const [average, setAverage] = useState(0);

  useEffect(() => {
    let total = 0;
    let count = 0;

    if (currentProduct && currentProduct.id) {
      const productId = currentProduct.id;
      axios.get(`/reviews/meta?product_id=${productId}`)
        .then((response) => {
          if (response.data.ratings !== undefined) {
            setRatings(response.data.ratings);

            // Calculate average rating
            if (Object.prototype.hasOwnProperty.call(response.data.ratings, '1')) {
              Object.keys(response.data.ratings).forEach((key) => {
                total += response.data.ratings[key] * Number.parseInt(key, 10);
                count += Number.parseInt(response.data.ratings[key], 10);
              });
            }

            if (count !== 0) {
              setAverage(total / count);
            }
          }
        })
        .catch((err) => {
          console.error('failed to set ratings: ', err);
        });
    }
  }, [currentProduct]);

  return (
    <StarRating rating={average} />
  );
}

export default AverageStars;
