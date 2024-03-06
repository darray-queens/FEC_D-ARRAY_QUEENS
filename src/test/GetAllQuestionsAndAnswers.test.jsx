import React from 'react';
import { render } from '@testing-library/react';
import GetAllQuestionsAndAnswers from '../components/questionsAndAnswers/GetAllQuestionsAndAnswers';

describe('GetAllQuestionsAndAnswers component', () => {
  test('renders without crashing', () => {
    render(<GetAllQuestionsAndAnswers currentProduct={{ id: 1 }} />);
  });
});