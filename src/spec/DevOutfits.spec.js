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

import OutfitsList from '../components/relatedProductsModule/outfits/OutfitsList';
import ComparisonModule from '../components/relatedProductsModule/RelatedProducts/ComparisonModule';

jest.mock('axios');

afterEach(() => {
  jest.clearAllMocks();
});

describe('OutfitsList', () => {

  it('renders Your Outfit component', async () => {
    render(<OutfitsList currentProduct={productSample}/>);

      await waitFor(() => {
        return screen.getByText('Your Outfit');
      })

      expect(screen.queryByText('Loading...')).not.toBeTruthy();
    })

});

// ComparisonModule.jsx
// RelatedProductsList.jsx
// ProductCard.jsx
// fetchSalePrice.jsx
// scrollButtonClick.js
//