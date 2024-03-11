/**
 * @jest-environment jsdom
 */

import axios from 'axios';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import productSample from './sampleData';
import sampleProductData from './sampleProductData';
import sampleStyleData from './sampleStyleData';
import sampleReviewData from './sampleReviewData';
import sampleComparedItems from './sampleComparedItems';
import {product1Features, product2Features} from './sampleProductFeaturesData';

import RelatedProductsList from '../components/relatedProductsModule/RelatedProducts/RelatedProductsList';
import ComparisonModule from '../components/relatedProductsModule/RelatedProducts/ComparisonModule';

jest.mock('axios');

afterEach(() => {
  jest.clearAllMocks();
});

describe('RelatedProductsList', () => {
  axios.get.mockResolvedValueOnce({data: sampleProductData})
  axios.get.mockResolvedValueOnce({data: sampleStyleData})
  axios.get.mockResolvedValueOnce({data: sampleReviewData})
  axios.get.mockResolvedValueOnce({data: sampleStyleData})

  it('renders RelatedProductsList component', async () => {
    render(<RelatedProductsList currentProduct={productSample}/>);

      expect(screen.getByText('Loading...')).toBeTruthy();

      await waitFor(() => {
        return screen.getByText('Related Products');
      })

      expect(screen.queryByText('Loading...')).not.toBeTruthy();

    })

    axios.get.mockResolvedValueOnce({data: product1Features});
    axios.get.mockResolvedValueOnce({data: product2Features});


    it('opens the Comparison Module when two stars are clicked', async () => {
      render(<ComparisonModule comparedItems={sampleComparedItems} />)

      expect(screen.getByText('Comparing')).toBeTruthy();

      await waitFor(() => {
        expect(screen.getByText('Carter Jacket')).toBeTruthy();
      })

      await waitFor(() => {
        expect(screen.getByText('Zaria Jacket')).toBeTruthy();
      })

    })

    it('closes the Comparison Module when clicked away', async () => {
      const user = userEvent.setup();

      await user.click()

      expect(screen.queryByText('Comparing')).not.toBeTruthy();
    })

});

// ComparisonModule.jsx
// RelatedProductsList.jsx
// ProductCard.jsx
// fetchSalePrice.jsx
// scrollButtonClick.js
//