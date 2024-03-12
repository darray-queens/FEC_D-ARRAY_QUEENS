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

afterEach(() => {
  jest.clearAllMocks();
});

describe('Product Overview', () => {

  axios.get.mockResolvedValueOnce({data: sampleProductData});
  axios.get.mockResolvedValueOnce({data: sampleStyleData})
  axios.get.mockResolvedValueOnce({data: sampleReviewData})
  axios.get.mockResolvedValueOnce({data: sampleStyleData})

  it('renders Overview component', async () => {
    act(() => {
      render(
        <App>
          <Overview currentProduct={productSample} currentStyle={styleSample}/>
        </App>
      );
    });

    expect(screen.getByText('Loading...')).toBeTruthy();

    await waitFor(() => {
      return screen.getByText('Camo Onesie');
    })

    expect(screen.queryByText('Loading...')).not.toBeTruthy();
    screen.debug();
  });
});