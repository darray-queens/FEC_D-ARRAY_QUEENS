import React from 'react';

import axios from 'axios';

import App from '../../App';

const { useState, useEffect } = React;

function ReviewList({ currentProduct }) {
  const [reviews, setReviews] = useState([]);

  const productId = currentProduct.id;

  const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews?produce_id=${productId}`;

  useEffect(() => {
    axios.get(url)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((err) => {
        console.error('failed to set list: ', err);
      });
  }, []);
  // update to return entry component later
  return (
    <div>
      reviews
      {reviews.map((review) => (
        return <Review />
      ))}
    </div>
  );
}

export default ReviewList;
