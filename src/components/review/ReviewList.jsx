import React from 'react';

import axios from 'axios';

import styled from 'styled-components';

import Review from './Review';

import Sort from './Sort';

import AverageStars from '../shared/AverageStars';

import { Grid, Row, Col } from '../shared/containers';

import Breakdown from './Breakdown';

const { useState, useEffect } = React;

function ReviewList({ currentProduct }) {
  const [reviews, setReviews] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [relevantReviews, setRelevantReviews] = useState([]);
  const [renderedReviews, setRenderedReviews] = useState(2);

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

  return (
    <div id="reviews">
      <h2>Ratings & Reviews</h2>
      <Row>
        <Col size={1.5}>
          <Breakdown currentProduct={currentProduct} setReviews={setReviews} reviews={reviews} />
        </Col>
        <Col size={3.5}>
          <Sort reviews={reviews} setReviews={setReviews} relevantReviews={relevantReviews} />
          <StylesDiv>
            {reviews.slice(0, renderedReviews).map((review) => (
              <Review key={review.review_id} entry={review} />
            ))}
          </StylesDiv>
          {renderedReviews < reviews.length && (
          <StylesButton
            type="button"
            onClick={moreReviews}
          >
            More Reviews
          </StylesButton>
          )}
        </Col>
      </Row>
    </div>
  );
}

const StylesDiv = styled.div`
  overflow: auto;
  max-height: 600px;
`;

const RightCol = styled(Col)`
  text-align: right
`;

const StylesCol = styled(Col)`
  margin-right: 5px;
  margin-bottom: 5px;
  padding: 5px;
  border: 1px solid rgb(48,48,48);
  background: rgb(232,232,232);
  &: hover {
    background: rgb(224,224,224);
    border-color: rgb(16,16,16);
  }
`;

const StylesButton = styled.button`
  padding: 10px;
  margin-top: 10px;
  margin-bttom: 10px;
  margin-right: 10px;
`;

export default ReviewList;
