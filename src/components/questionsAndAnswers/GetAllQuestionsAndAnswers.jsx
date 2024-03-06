/* global describe, it, expect */

import React from 'react';
import { render, screen } from '@testing-library/react';
import GetAllQuestionsAndAnswers from './GetAllQuestionsAndAnswers';

describe('GetAllQuestionsAndAnswers', () => {
  it('renders a button with the text "Add Question"', () => {
    render(<GetAllQuestionsAndAnswers />);
    const addQuestionButton = screen.getByText('Add Question');
    expect(addQuestionButton).toBeInTheDocument();
  });
});