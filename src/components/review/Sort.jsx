import React from 'react';

function Sort({ reviews, setReviews }) {
  const sortByHelpfulness = () => {
    const sorted = [...reviews].sort((a, b) => b.helpfulness - a.helpfulness);
    setReviews(sorted);
  };

  const sortByNewest = () => {
    const sorted = [...reviews].sort((a, b) => b.date - a.date);
    setReviews(sorted);
  };
  // TODO: implement a way to sort by relevance
  return(
    <label>
      {reviews.length - 1}
      reviews, sorted by
      {' '}
      <select name="slectedSort">
        <option value="relevance">relevance</option>
        <option value="helpfulness">helpfulness</option>
        <option value="newest">newest</option>
      </select>
    </label>
  );
}

export default Sort;
