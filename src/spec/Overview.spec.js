/**
 * @jest-environment jsdom
 */

import axios from 'axios';

import * as React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import productSample from './sampleData';
import styleSample from './sampleStyle';
import sampleProductData from './sampleProductData';
import sampleStyleData from './sampleStyleData';
import sampleReviewData from './sampleReviewData';

import App from '../App';
import Overview from '../components/overview/Overview';

jest.mock('axios');

describe('Product Overview', () => {

  const mockSetState = jest.fn();
  const useStateMock = (initState) => [initState, mockSetState];

  axios.get.mockResolvedValueOnce({data: sampleStyleData});
  axios.get.mockResolvedValueOnce({data: sampleReviewData});

  // afterEach(() => {
  //   jest.clearAllMocks();
  // });

  it('renders Overview component', async () => {

    jest.spyOn(React, 'useState').mockImplementation(useStateMock);

    act(() => {
      render(
        <Overview
          currentProduct={productSample}
          currentStyle={styleSample}
          changeCurrentStyle={mockSetState}
          changeMainImageIndex={mockSetState}
          changeMaxThumbIndex={mockSetState}
        />
      );
    });

    expect(screen.getByTestId('loading-options')).toBeTruthy();

    await waitFor(() => {
      return screen.getByText('Camo Onesie');
    })

    expect(screen.getByTestId('loading-options')).not.toBeTruthy();
    screen.debug();
  });
});