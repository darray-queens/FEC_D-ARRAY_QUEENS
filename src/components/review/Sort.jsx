import React from 'react';

function Sort({ reviews, setReviews }) {
  const sortByHelpfulness = () => {
    const sorted = [...reviews].sort((a, b) => b.helpfulness - a.helpfulness);
    setReviews(sorted);
  };

  const sortByNewest = () => {
    const sorted = [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date));
    setReviews(sorted);
  };

  const handleSortChange = (event) => {
    const selectedSort = event.target.value;
    if (selectedSort === 'helpfulness') {
      sortByHelpfulness();
    } else if (selectedSort === 'newest') {
      sortByNewest();
    }
    // add logic to sort by relevance later
  };
  // TODO: implement a way to sort by relevance
  return (
    <label htmlFor="selectedSort">
      {reviews.length}
      {' '}
      reviews, sorted by
      {' '}
      <select id="selectedSort" name="slectedSort" onChange={handleSortChange}>
        <option value="relevance">relevance</option>
        <option value="helpfulness">helpfulness</option>
        <option value="newest">newest</option>
      </select>
    </label>
  );
}

export default Sort;
