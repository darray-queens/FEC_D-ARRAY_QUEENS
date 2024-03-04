import React from 'react';

import axios from 'axios';

import Review from './Review';

const { useState, useEffect } = React;

function ReviewList({ currentProduct }) {
  const [reviews, setReviews] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if (currentProduct && currentProduct.id) {
      const productId = currentProduct.id;
      axios.get(`reviews?product_id=${productId}&page=${pageNumber}`)
        .then((response) => {
          if (response.data.results.length !== 0) {
            setReviews((prevReviews) => prevReviews.concat(response.data.results));
            setPageNumber((prevPageNumber) => prevPageNumber + 1);
          }
        })
        .catch((err) => {
          console.error('failed to set list: ', err);
        });
    }
  }, [currentProduct, pageNumber]);

  if (reviews.length === 0) {
    return <div>Loading Reviews</div>;
  }

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
