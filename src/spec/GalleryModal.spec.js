/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import sampleStyleImages from './sampleStyleImages';

import GalleryModal from '../components/overview/GalleryModal';

// afterEach(() => {
//   jest.clearAllMocks();
// });

describe('Gallery Modal', () => {

  it('renders GalleryModal component', () => {
    render(
      <GalleryModal
        styleImages={sampleStyleImages}
        mainImageIndex={0}
      />
    );

    expect(screen.getByTestId('modal-container')).toBeTruthy();
    expect(screen.getByTestId('modal-main-image')).toBeTruthy();
    expect(screen.getByTestId('modal-next-main')).toBeTruthy();
  });

  it('changes the displayed image after "next" button is clicked', () => {

    const mockSetMainIndex = jest.fn();
    const useStateMockMainIndex = (initState) => [initState, mockSetMainIndex];

    const mockSetMinIndex = jest.fn();
    const useStateMockMinIndex = (initState) => [initState, mockSetMinIndex];

    const mockSetMaxIndex = jest.fn();
    const useStateMockMaxIndex = (initState) => [initState, mockSetMaxIndex];

    // jest.spyOn(React, 'useState').mockImplementation(useStateMockMainIndex);

    const imageUrl = 'url(https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80)';

    render(
      <GalleryModal
        styleImages={sampleStyleImages}
        mainImageIndex={0}
        changeMainImageIndex={mockSetMainIndex}
        maxThumbIndex={6}
        changeMaxThumbIndex={mockSetMaxIndex}
        minThumbIndex={0}
        changeMinThumbIndex={mockSetMinIndex}
      />
    );

    userEvent.click(screen.getByTestId('modal-next-main'));
    expect(screen.getByTestId('modal-main-image').style.backgroundImage).toEqual(imageUrl);
  });
});