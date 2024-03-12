/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import productSample from './sampleData';
import ReviewList from '../components/review/ReviewList';
import axios from 'axios'
import sampleReviews from './sampleReviews';

jest.mock('axios')

const { useState } = React;

describe('ReviewList', () => {
  const [reviews, setReviews] = useState([]);
  axios.get.mockResolvedValueOnce({data: sampleReviews});
  it('renders ReviewList component', () => {
    render(<ReviewList currentProduct={productSample} reviews={[]} updateReviews={(newReviews) => setReviews(newReviews)}/>);
    expect(screen.getByText('No reviews loaded')).toBeTruthy();
  });
});