jest.mock('./styles.css', () => ({}));
import * as React from 'react';
import { render, screen } from '@testing-library/react';


import productSample from './sampleData';
import GetAllQuestionsAndAnswers from '../components/questionsAndAnswers/GetAllQuestionsAndAnswers';


describe('GetAllQuestionsAndAnswers', () => {
  it('renders GetAllQuestionsAndAnswer component', () => {
    render(<GetAllQuestionsAndAnswers currentProduct={productSample}/>);
    screen.debug();
  });
});