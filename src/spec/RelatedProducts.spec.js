/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render, screen } from '@testing-library/react';

import productSample from './sampleData';

import RelatedProductsList from '../components/relatedProductsModule/RelatedProducts/RelatedProductsList';


describe('Overview', () => {
  it('renders RelatedProductsList component', () => {
    render(<RelatedProductsList  />);
    screen.debug();
  });
});