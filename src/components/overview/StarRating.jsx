import React from 'react';

function StarRating() {
  const scrollToReviews = () => {
    document
      .getElementById('reviews')
      .scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <button type="button" onClick={scrollToReviews}>☆☆☆☆☆ - Read all reviews</button>
    </div>
  );
}

export default StarRating;
