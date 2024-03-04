import React from 'react';

import axios from 'axios';

import Review from './Review';

const { useState, useEffect } = React;

function ReviewList({ currentProduct }) {
  const [reviews, setReviews] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [renderedReviews, setRenderedReviews] = useState(2);

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
    return <div>No reviews loaded</div>;
  }

  const moreReviews = () => {
    setRenderedReviews((prevRenderedReviews) => prevRenderedReviews + 2);
  };

  return (
    <div>
      reviews
      {reviews.slice(0, renderedReviews).map((review) => (
        <Review key={review.review_id} entry={review} />
      ))}
      {renderedReviews < reviews.length && (
      <button
        type="button"
        onClick={moreReviews}
      >
        More Reviews
      </button>
      )}
    </div>
  );
}

export default ReviewList;
