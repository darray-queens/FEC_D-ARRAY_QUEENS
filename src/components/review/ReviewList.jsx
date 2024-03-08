import React from 'react';

import axios from 'axios';

import styled from 'styled-components';

import Review from './Review';

import Sort from './Sort';

import { Row, Col } from '../shared/containers';

import Breakdown from './Breakdown';

import Write from './Write';

const { useState, useEffect } = React;

function ReviewList({ currentProduct }) {
  const [reviews, setReviews] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [relevantReviews, setRelevantReviews] = useState([]);
  const [renderedReviews, setRenderedReviews] = useState(2);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [answerModal, setAnswerModal] = useState(null);

  useEffect(() => {
    setReviews([]);
    setRelevantReviews([]);
    setPageNumber(1);
    setRenderedReviews(2);
  }, [currentProduct]);

  useEffect(() => {
    if (currentProduct && currentProduct.id) {
      const productId = currentProduct.id;
      axios.get(`/reviews?product_id=${productId}&page=${pageNumber}&sort=relevant`)
        .then((response) => {
          if (response.data.results.length !== 0) {
            setRelevantReviews((prevReviews) => prevReviews.concat(response.data.results));
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

  const exitAnswerModal = () => {
    setAnswerModal(null);
  };

  const openAnswerModal = () => {
    setAnswerModal(true);
  };

  return (
    <div id="reviews">
      <h2>Ratings & Reviews</h2>
      <Row style={{ flexWrap: 'wrap' }}>
        <Col size={1.5} style={{ minWidth: '300px' }}>
          <Breakdown
            currentProduct={currentProduct}
            reviews={reviews}
            setFilteredReviews={setFilteredReviews}
            filteredReviews={filteredReviews}
          />
        </Col>
        <Col size={3.5} style={{ minWidth: '200px', marginLeft: '20px' }}>
          <Sort
            reviews={filteredReviews.length >= 1
              ? filteredReviews
              : reviews}
            setReviews={filteredReviews.length >= 1
              ? setFilteredReviews
              : setReviews}
            relevantReviews={relevantReviews}
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
          {renderedReviews < reviews.length && (
          <StylesButton
            type="button"
            onClick={moreReviews}
          >
            MORE REVIEWS
          </StylesButton>
          )}
          <StylesButton
            type="button"
            onClick={openAnswerModal}
          >
            ADD A REVIEW +
          </StylesButton>
          {answerModal && <Write closeModal={exitAnswerModal} />}
        </Col>
      </Row>
    </div>
  );
}

const StylesDiv = styled.div`
  overflow: auto;
  max-height: 600px;
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
