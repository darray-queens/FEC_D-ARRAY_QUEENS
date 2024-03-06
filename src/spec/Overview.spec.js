/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render, screen } from '@testing-library/react';

import productSample from './sampleData';

import Overview from '../components/overview/Overview';

describe('Overview', () => {
  it('renders Overview component', () => {
    render(<Overview currentProduct={productSample}/>);
    screen.debug();
  });
});