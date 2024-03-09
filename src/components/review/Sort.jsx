import React from 'react';

import styled from 'styled-components';

function Sort({
  reviews, setSort, setReviews,
}) {
  const sortByHelpfulness = () => {
    // setSort('helpful');
    const sortedHelpful = [...reviews].sort((a, b) => b.helpfulness - a.helpfulness);
    setReviews(sortedHelpful);
  };

  const sortByNewest = () => {
    setSort('newest');
  };

  const sortByRelevance = () => {
    setSort('relevant');
  };

  const handleSortChange = (event) => {
    const selectedSort = event.target.value;
    if (selectedSort === 'helpfulness') {
      sortByHelpfulness();
    } else if (selectedSort === 'newest') {
      sortByNewest();
    } else if (selectedSort === 'relevance') {
      sortByRelevance();
    }
  };

  return (
    <StylesDiv>
      <label htmlFor="selectedSort">
        <b>
          {reviews.length}
          {' '}
          reviews, sorted by
          {' '}
          <SortSelector id="selectedSort" name="selectedSort" onChange={handleSortChange}>
            <option value="relevance">relevance</option>
            <option value="helpfulness">helpfulness</option>
            <option value="newest">newest</option>
          </SortSelector>
        </b>
      </label>
    </StylesDiv>
  );
}

const StylesDiv = styled.div`
margin-bottom: 35px
`;

const SortSelector = styled.select`
  border: none;
  background: none;
  outline: none;
  border-bottom: 1px solid black;
  padding: 1px;
  font-size: inherit;
  font-family: inherit;
  font-weight: bold;
`;

export default Sort;
