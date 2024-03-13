/**
 * @jest-environment jsdom
 */

import axios from 'axios';

import React, { useState } from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import productSample from './sampleRelatedProductsData/sampleMainProduct';

import sampleProductData from './sampleRelatedProductsData/TwoSampleProductData';
import sampleStyleData from './sampleRelatedProductsData/sampleStyleData';
import sampleProduct1StyleData from './sampleRelatedProductsData/testingData/sampleProduct1StyleData';
import sampleProduct2StyleData from './sampleRelatedProductsData/testingData/sampleProduct2StyleData';
import sampleReviewData from './sampleRelatedProductsData/sampleReviewData';
import sampleComparedItems from './sampleRelatedProductsData/sampleComparedItems';

import sampleProduct1ReviewData from './sampleRelatedProductsData/testingData/sampleProduct1ReviewData';
import sampleProduct2ReviewData from './sampleRelatedProductsData/testingData/sampleProduct2ReviewData';

import sampleStyleData1 from './sampleRelatedProductsData/testingData/sampleStyleData1';
import sampleStyleData2 from './sampleRelatedProductsData/testingData/sampleStyleData2';

import { product1Features, product2Features } from './sampleRelatedProductsData/sampleProductFeaturesData';
import { waitForElementToBeRemoved } from '@testing-library/react';

import RelatedProductsList from '../components/relatedProductsModule/RelatedProducts/RelatedProductsList';
import ComparisonModule from '../components/relatedProductsModule/RelatedProducts/ComparisonModule';

jest.mock('axios');
const mockSetState = jest.fn();
const useStateMock = (initState) => [initState, mockSetState];

const useStateSpy = jest.spyOn(React, 'useState');

jest.spyOn(React, 'useState').mockImplementation(useStateMock);

afterEach(() => {
  jest.clearAllMocks();
});

describe('RelatedProductsList', () => {
  axios.get.mockResolvedValueOnce({data: sampleProductData})
  axios.get.mockResolvedValueOnce({data: sampleProduct1StyleData})
  axios.get.mockResolvedValueOnce({data: sampleProduct2StyleData})

  axios.get.mockResolvedValueOnce({data: sampleProduct1ReviewData})
  axios.get.mockResolvedValueOnce({data: sampleProduct2ReviewData})
  axios.get.mockResolvedValueOnce({data: sampleProduct1StyleData})
  axios.get.mockResolvedValueOnce({data: sampleProduct2StyleData})

  it('renders RelatedProductsList component', async () => {
    render(<RelatedProductsList currentProduct={productSample}/>);

      expect(screen.getByText('Loading...')).toBeTruthy();

      await waitFor(() => {
        return screen.getByText('Related Products');
      })

      screen.debug()

      // expect(screen.queryByText('Loading...')).not.toBeTruthy();
    })

  // it('expects true to be true', () => {
  //   expect.(true).toBe(true);
  // })
  // axios.get.mockResolvedValueOnce({ data: sampleProductData })
  // axios.get.mockResolvedValueOnce({ data: sampleStyleData })
  // axios.get.mockResolvedValueOnce({ data: sampleReviewData })
  // axios.get.mockResolvedValueOnce({ data: sampleStyleData })

  // it('renders RelatedProductsList component', async () => {
  //   render(<RelatedProductsList currentProduct={productSample} />);

  //   expect(screen.getByText('Loading...')).toBeTruthy();

  //   await waitFor(() => {
  //     return screen.getByText('Related Products');
  //   })

  //   expect(screen.queryByText('Loading...')).not.toBeTruthy();
  // })

  // axios.get.mockResolvedValueOnce({ data: product1Features });
  // axios.get.mockResolvedValueOnce({ data: product2Features });


  // it('opens the Comparison Module when two stars are clicked', async () => {
  //   render(<ComparisonModule comparedItems={sampleComparedItems} />)

  //   expect(screen.getByText('Comparing')).toBeTruthy();

  //   await waitFor(() => {
  //     expect(screen.getByText('Carter Jacket')).toBeTruthy();
  //   })

  //   await waitFor(() => {
  //     expect(screen.getByText('Zaria Jacket')).toBeTruthy();
  //   })



  // })

  // axios.get.mockResolvedValueOnce({data: product1Features});
  // axios.get.mockResolvedValueOnce({data: product2Features});

  // it('closes the Comparison Module when clicked away', async () => {
  //   render(<>
  //     <div data-testid="test">test</div>
  //   <div>
  //   <RelatedProductsList currentProduct={productSample} />
  //   </div>
  //   </>
  //   )
  //   const user = userEvent.setup();

  //   await waitFor(() => {
  //     return screen.getByText('Related Products');
  //   })

  //   await waitFor(() => {
  //     return screen.getAllByRole('button');
  //   });

  //   const allButtons = screen.getAllByRole('button');
  //   const starButtons = allButtons.filter(button => button.textContent === '★');

  //   console.log(starButtons)

  //   await user.click(starButtons[0])
  //   await user.click(starButtons[1])

  //   await waitFor(() => {
  //     return screen.getByText('Comparing');
  //   })

  //   expect(screen.getByText('Comparing')).toBeTruthy();

    // await user.click(screen.getByTestId('test'))

    // await waitForElementToBeRemoved(() => screen.queryByText('Comparing'));

    // expect(screen.queryByText('Comparing')).not.toBeTruthy();
  // })

  // it('scrolls through items in the related products list', () => {
  //   render(<RelatedProductsList currentProduct={productSample}/>);

  //   const user = userEvent.setup();

  //   user.click(getByText('>'))

  //   expect(screen.queryByText('Hattie Jacket')).toBeTruthy();
  // })

});

// ComparisonModule.jsx
// RelatedProductsList.jsx
// ProductCard.jsx
// fetchSalePrice.jsx
// scrollButtonClick.js
//