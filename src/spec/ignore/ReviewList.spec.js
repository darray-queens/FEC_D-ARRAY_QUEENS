/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render, screen } from '@testing-library/react';

import productSample from './sampleData';

import ReviewList from '../components/review/ReviewList';

describe('ReviewList', () => {
  it('renders ReviewList component', () => {
    render(<ReviewList currentProduct={productSample}/>);
    screen.debug();
  });
});