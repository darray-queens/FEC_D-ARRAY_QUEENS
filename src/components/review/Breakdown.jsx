import React from 'react';

import axios from 'axios';

import styled from 'styled-components';

import AverageStars from '../shared/AverageStars';

import Bar from './Bar';

import { Row, Col } from '../shared/containers';

import IconBar from './BreakdownFactors';

const { useState, useEffect } = React;

function Breakdown({
  currentProduct, reviews, setFilteredReviews, filteredReviews
}) {
  const [average, setAverage] = useState(0);
  const [recommendPercent, setRecommendPercent] = useState(0);
  const [fiveStarRate, setFiveStarRate] = useState(0);
  const [fourStarRate, setFourStarRate] = useState(0);
  const [threeStarRate, setThreeStarRate] = useState(0);
  const [twoStarRate, setTwoStarRate] = useState(0);
  const [oneStarRate, setOneStarRate] = useState(0);
  const [activeFilters, setActiveFilters] = useState([]);
  const [factors, setFactors] = useState({});

  // useEffect(() => {
  //   setReviews(reviews);
  // }, [reviews]);

  useEffect(() => {
    let total = 0;
    let count = 0;
    let Rec = 0;
    let totalRec = 0;
    let one = 0;
    let two = 0;
    let three = 0;
    let four = 0;
    let five = 0;

    if (currentProduct && currentProduct.id) {
      const productId = currentProduct.id;
      axios.get(`/reviews/meta?product_id=${productId}`)
        .then((response) => {
          setFactors(response.data.characteristics);
          if (response.data.ratings !== undefined) {
            if (Object.prototype.hasOwnProperty.call(response.data.ratings, '1')) {
              Object.keys(response.data.ratings).forEach((key) => {
                total += response.data.ratings[key] * Number.parseInt(key, 10);
                count += Number.parseInt(response.data.ratings[key], 10);
                if (key === '1') {
                  one += Number.parseInt(response.data.ratings[key], 10);
                }
                if (key === '2') {
                  two += Number.parseInt(response.data.ratings[key], 10);
                }
                if (key === '3') {
                  three += Number.parseInt(response.data.ratings[key], 10);
                }
                if (key === '4') {
                  four += Number.parseInt(response.data.ratings[key], 10);
                }
                if (key === '5') {
                  five += Number.parseInt(response.data.ratings[key], 10);
                }
              });
            }

            if (count !== 0) {
              setAverage(Math.round((total / count) * 4) / 4);
            }
            setOneStarRate(one / count);
            setTwoStarRate(two / count);
            setThreeStarRate(three / count);
            setFourStarRate(four / count);
            setFiveStarRate(five / count);
          }
          if (response.data.recommended !== undefined) {
            if (Object.prototype.hasOwnProperty.call(response.data.recommended, 'true')) {
              Object.keys(response.data.recommended).forEach((key) => {
                totalRec += Number.parseInt(response.data.recommended[key], 10);
              });
              Rec += Number.parseInt(response.data.recommended.true, 10);
            }

            if (totalRec !== 0) {
              setRecommendPercent(Math.round((Rec / totalRec) * 100));
            }
          }
        })
        .catch((err) => {
          console.error('failed to set ratings: ', err);
        });
    }
  }, [currentProduct]);

  const handleFilter = (event) => {
    const value = Number.parseInt(event.target.textContent, 10);
    const index = activeFilters.indexOf(value);
    let newFilters = [];

    if (index === -1) {
      newFilters = [...activeFilters, value];
    } else {
      newFilters = [...activeFilters];
      newFilters.splice(index, 1);
    }
    setActiveFilters(newFilters);
  };

  useEffect(() => {
    if (activeFilters.length > 0) {
      console.log('testing123', filteredReviews);
      const filtered = reviews.filter((review) => activeFilters.includes(review.rating));
      setFilteredReviews(filtered);
    } else {
      setFilteredReviews([]);
    }
  }, [activeFilters, reviews, setFilteredReviews]);

  const resetFilter = () => {
    setActiveFilters([]);
  };

  return (
    <div>
      <Container>
        <StylesB>
          {average}
        </StylesB>
        {' '}
        <StarsWrapper>
          <AverageStars currentProduct={currentProduct} />
        </StarsWrapper>
      </Container>
      <StylesRow>
        {recommendPercent}
        % of reviews recommend this product
      </StylesRow>
      <StylesRow>
        <FilterContainer onClick={handleFilter} $active={activeFilters.includes(1)}>
          1 stars
          {' '}
        </FilterContainer>
        <RightCol>
          <Bar percent={oneStarRate} />
        </RightCol>
      </StylesRow>
      <StylesRow>
        <FilterContainer onClick={handleFilter} $active={activeFilters.includes(2)}>
          2 stars
          {' '}
        </FilterContainer>
        <RightCol>
          <Bar percent={twoStarRate} />
        </RightCol>
      </StylesRow>
      <StylesRow>
        <FilterContainer onClick={handleFilter} $active={activeFilters.includes(3)}>
          3 stars
          {' '}
        </FilterContainer>
        <RightCol>
          <Bar percent={threeStarRate} />
        </RightCol>
      </StylesRow>
      <StylesRow>
        <FilterContainer onClick={handleFilter} $active={activeFilters.includes(4)}>
          4 stars
          {' '}
        </FilterContainer>
        <RightCol>
          <Bar percent={fourStarRate} />
        </RightCol>
      </StylesRow>
      <StylesRow>
        <FilterContainer onClick={handleFilter} $active={activeFilters.includes(5)}>
          5 stars
          {' '}
        </FilterContainer>
        <RightCol>
          <Bar percent={fiveStarRate} />
        </RightCol>
      </StylesRow>
      <StylesRow>
        {(activeFilters.length >= 1) && (
        <StylesButton onClick={resetFilter}>
          Click to disable the following active filters:
          {activeFilters.join(', ')}
        </StylesButton>
        )}
      </StylesRow>
      <StylesRow>
        {Object.keys(factors).map((key) => (
          <IconBar
            key={key}
            characteristic={key}
            average={factors[key].value}
          />
        ))}
        {/* <IconBar characteristic="Width" average={3} /> */}
      </StylesRow>
    </div>
  );
}
const Container = styled.div`
  display: flex;
  align-items: flex-start;
  min-width: 250px;
`;

const FilterContainer = styled(Col)`
  &:hover {
    text-decoration: underline;
  }
  ${({ $active }) => $active
  && `
  font-weight: bold;
  `}
`;

const StylesB = styled.b`
  font-size: 70px;
  font-weight: 550;
`;

const StylesRow = styled(Row)`
  margin-top: 15px;
`;

const StarsWrapper = styled(Col)`
  margin-top: 15px;
  margin-left: 20px;
`;

const RightCol = styled(Col)`
  margin-left: 10px;
`;

const StylesButton = styled.button`
  padding: 10px;
  margin-top: 10px;
  margin-bttom: 10px;
  margin-right: 10px;
  max-width: 200px;
  font-weight: bold;
  background-color: white;
  &:hover {
    background-color: rgb(220,220,220);
  }
`;

export default Breakdown;
