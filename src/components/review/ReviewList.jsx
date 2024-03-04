import React from 'react';

import axios from 'axios';

import Review from './Review';

const { useState, useEffect } = React;

function ReviewList({ currentProduct }) {
  const [reviews, setReviews] = useState([]);

  const productId = currentProduct.id;

  useEffect(() => {
    if (productId) {
      axios.get(`reviews?product_id=${productId}`)
        .then((response) => {
          setReviews(response.data.results);
        })
        .catch((err) => {
          console.error('failed to set list: ', err);
        });
    }
  }, [productId]);

  return (
    <div>
      reviews
      {reviews.map((review) => (
        <Review key={review.review_id} entry={review} />
      ))}
    </div>
  );
}

export default ReviewList;
