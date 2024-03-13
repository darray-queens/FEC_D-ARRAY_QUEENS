/**
 * @jest-environment jsdom
 */

import axios from 'axios';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import productSample from './sampleRelatedProductsData/sampleMainProduct';
import sampleProductData from './sampleRelatedProductsData/devSampleProductData';
import sampleStyleData from './sampleRelatedProductsData/sampleStyleData';
import sampleReviewData from './sampleRelatedProductsData/sampleReviewData';
import sampleComparedItems from './sampleRelatedProductsData/sampleComparedItems';
import {product1Features, product2Features} from './sampleRelatedProductsData/sampleProductFeaturesData';

import RelatedProductsList from '../components/relatedProductsModule/relatedProducts/RelatedProductsList';
import ComparisonModule from '../components/relatedProductsModule/relatedProducts/ComparisonModule';

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

    it('the Comparison Module contains product features for two things', async () => {
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