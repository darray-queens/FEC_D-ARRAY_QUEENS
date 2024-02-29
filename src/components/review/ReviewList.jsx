import React from 'react';

import axios from 'axios';

const { useState, useEffect } = React;

function ReviewList() {
  const [reviews, setReviews] = useState([]);

  const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews';

  const token = process.env.TOKEN;

  useEffect(() => {
    axios.get(url, {
      params: { product_id: 40344 },
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setReviews(response.data);
      })
      .catch((err) => {
        console.error('failed to set list: ', err);
      });
  }, [token]);
  // update to return entry component later
  return (
    <div>Test</div>
  );
}

export default ReviewList;
