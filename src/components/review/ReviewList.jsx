import React from 'react';

import axios from 'axios';

import styled from 'styled-components';

import Review from './Review';

import Sort from './Sort';

import { Row, Col } from '../shared/containers';

import Breakdown from './Breakdown';

import ReviewForm from './ReviewForm';

const { useState, useEffect } = React;

function ReviewList({ currentProduct, reviews, updateReviews }) {
  const [relevantReviews, setRelevantReviews] = useState([]);
  const [renderedReviews, setRenderedReviews] = useState(2);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [answerModal, setAnswerModal] = useState(null);
  const [activeFilters, setActiveFilters] = useState([]);
  const [count, setCount] = useState(2);
  const [sort, setSort] = useState('relevant');
  const [refresh, setRefresh] = useState(true);
  const [factors, setFactors] = useState({});

  useEffect(() => {
    updateReviews([]);
    setRelevantReviews([]);
    setCount(1);
    setRenderedReviews(2);
    setSort('relevant');
  }, [currentProduct]);

  useEffect(() => {
    if (currentProduct && currentProduct.id) {
      const productId = currentProduct.id;
      axios.get(`/reviews?product_id=${productId}&count=${count}&sort=${sort}`)
        .then((response) => {
          if (JSON.stringify(response.data.results) !== JSON.stringify(reviews)) {
            updateReviews(response.data.results);
            setCount((prevCount) => prevCount + 10);
          }
        })
        .catch((err) => {
          console.error('failed to set list: ', err);
        });
    }
  }, [currentProduct, count, sort, refresh]);

  if (reviews.length === 0) {
    return <div>No reviews loaded</div>;
  }

  const moreReviews = () => {
    setRenderedReviews((prevRenderedReviews) => prevRenderedReviews + reviews.length);
  };

  const exitAnswerModal = () => {
    setAnswerModal(null);
  };

  const openAnswerModal = () => {
    setAnswerModal(true);
  };

  return (
    <div id="reviews">
      <h2>Ratings & Reviews</h2>
      <Row>
        <StylesCol2 size={1}>
          <Breakdown
            currentProduct={currentProduct}
            reviews={reviews}
            setFilteredReviews={setFilteredReviews}
            filteredReviews={filteredReviews}
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
            factors={factors}
            setFactors={setFactors}
          />
        </StylesCol2>
        <StylesCol size={4}>
          <Sort
            reviews={reviews}
            setReviews={updateReviews}
            relevantReviews={relevantReviews}
            activeFilters={activeFilters}
            setFilteredReviews={setFilteredReviews}
            sort={sort}
            setSort={setSort}
          />
          <StylesDiv>
            {filteredReviews.length >= 1
              ? filteredReviews.slice(0, renderedReviews).map((review) => (
                <Review key={review.review_id} entry={review} />
              ))
              : reviews.slice(0, renderedReviews).map((review) => (
                <Review key={review.review_id} entry={review} />
              ))}
          </StylesDiv>
          {filteredReviews.length > 0 ? (renderedReviews < filteredReviews.length && (
          <StylesButton
            type="button"
            onClick={moreReviews}
          >
            MORE REVIEWS
          </StylesButton>
          )) : (renderedReviews < reviews.length && (
          <StylesButton
            type="button"
            onClick={moreReviews}
          >
            MORE REVIEWS
          </StylesButton>
          ))}
          <StylesButton
            type="button"
            onClick={openAnswerModal}
          >
            ADD A REVIEW +
          </StylesButton>
          {answerModal && (
          <ReviewForm
            closeModal={exitAnswerModal}
            currentProduct={currentProduct}
            refresh={refresh}
            setRefresh={setRefresh}
            factors={factors}
          />
          )}
        </StylesCol>
      </Row>
    </div>
  );
}

const StylesDiv = styled.div`
  overflow-y: auto;
  max-height: 600px;
  padding-left: 0;
  width: 100%
`;

const StylesCol = styled(Col)`
  width: 80%;
`;

const StylesCol2 = styled(Col)`
  min-width: 270px;
  margin-right: 20px;
`;

const StylesButton = styled.button`
  padding: 10px;
  margin-top: 60px;
  margin-bottom: 20px;
  margin-right: 20px;
  font-weight: bold;
  background-color: white;
  height: 60px;
  width: 150px;
  &:hover {
    background-color: rgb(220,220,220);
  }
`;

export default ReviewList;
