/**
 * @jest-environment jsdom
 */

import axios from 'axios';

import { render, screen, waitFor } from '@testing-library/react';

import productSample from './sampleData';
import sampleProductData from './sampleProductData';
import sampleStyleData from './sampleStyleData';
import sampleReviewData from './sampleReviewData';

import RelatedProductsList from '../components/relatedProductsModule/RelatedProducts/RelatedProductsList';

jest.mock('axios');

beforeEach(() => {
  axios.get.mockResolvedValueOnce({data: sampleProductData})
  axios.get.mockResolvedValueOnce({data: sampleStyleData})
  axios.get.mockResolvedValueOnce({data: sampleReviewData})
  axios.get.mockResolvedValueOnce({data: sampleStyleData})
})

afterEach(() => {
  jest.clearAllMocks();
});

describe('RelatedProductsList', () => {
  it('renders RelatedProductsList component', async () => {
    render(<RelatedProductsList currentProduct={productSample}/>);


      expect(screen.getByText('Loading...')).toBeTruthy();

      await waitFor(() => {
        return screen.getByText('Related Products');
      })

      expect(screen.queryByText('Loading...')).not.toBeTruthy();

    })

});

