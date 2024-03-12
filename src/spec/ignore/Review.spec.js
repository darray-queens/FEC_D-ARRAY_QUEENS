/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render, screen } from '@testing-library/react';

import productSample from './sampleData';

import Review from '../components/review/Review';

describe('Review', () => {
  it('renders Review component', () => {
    render(<Review entry={{
      rating: 4,
      reviewer_name: 'Test',
      date: '2024-03-05',
      summary: 'Great product!',
      body: 'Very Yummy.',
      photos: [],
    }}
/>);
    screen.debug();
  });
});