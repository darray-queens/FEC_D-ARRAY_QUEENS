import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import GetAllQuestionsAndAnswers from '../components/questionsAndAnswers/GetAllQuestionsAndAnswers';
import AnswerItem from '../components/questionsAndAnswers/AnswerItem';
import QuestionModal from '../components/questionsAndAnswers/QuestionModal';
import AnswerModal from '../components/questionsAndAnswers/AnswerModal';
import ImageModal from '../components/questionsAndAnswers/ImageModal';
import SearchTerm from '../components/questionsAndAnswers/SearchInput';
import productSample from './sampleData';
import { sampleQuestionData } from './sampleQuestionData';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';

// Mock axios globally
jest.mock('axios');

///////////////////////////////////
//GetAllQuestionsAndAnswers Tests//
///////////////////////////////////

describe('GetAllQuestionsAndAnswers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    render(<GetAllQuestionsAndAnswers currentProduct={productSample}/>);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('fetches and displays questions and answers for a given product', async () => {
    axios.get.mockResolvedValue({ data: sampleQuestionData });
    await act(async () => {
      render(<GetAllQuestionsAndAnswers currentProduct={productSample}/>);
    });

    await waitFor(() => expect(screen.getByText(/How many colors/i)).toBeInTheDocument());
    // Verify that at least one answer is displayed
    await waitFor(() => expect(screen.getByText(/DAIRY QUEENS/i)).toBeInTheDocument());
  });

  it('opens QuestionModal on "Add a Question" button click', async () => {
    axios.get.mockResolvedValue({ data: sampleQuestionData });
    render(<GetAllQuestionsAndAnswers currentProduct={productSample}/>);

    // Wait for the button to appear in the DOM before trying to click it
    await waitFor(() => {
      const addButton = screen.getByText(/Add a Question ➕/i);
      userEvent.click(addButton);
    });
  });
});

/////////////////////
//Answer Item Tests//
/////////////////////

describe('AnswerItem', () => {
  const mockAnswer = {
    id: 5993737,
    body: "DAIRY QUEENS",
    date: "2024-03-08T00:00:00.000Z",
    answerer_name: "da queens",
    helpfulness: 3,
    photos: []
  };

  const reportedAnswers = new Set();

  it('renders the answer content', () => {
    render(<AnswerItem answerData={mockAnswer} reportedAnswers={reportedAnswers} />);
    expect(screen.getByText(/DAIRY QUEENS/i)).toBeInTheDocument();
    expect(screen.getByText(/da queens/i)).toBeInTheDocument();
  });

  // Add more tests for user interactions and conditional rendering
});

////////////////////////
//Question Modal Tests//
////////////////////////

describe('QuestionModal', () => {
  it('renders correctly', () => {
    render(<QuestionModal isOpen={true} onRequestClose={() => {}} productName="Sample Product" />);
    expect(screen.getByText(/Ask your question/i)).toBeInTheDocument();
  });

  // Test form submission behavior
  it('submits a question when form is completed and submit button is clicked', async () => {
    const mockOnRequestClose = jest.fn();
    render(<QuestionModal isOpen={true} onRequestClose={mockOnRequestClose} productName="Sample Product" />);

    // Fill out the form and submit
    await userEvent.type(screen.getByPlaceholderText(/Your Question */i), 'What is the warranty?');
    await userEvent.click(screen.getByText(/Submit question/i));
  });
});

////////////////////////
// Answer Modal Tests //
////////////////////////

// Render Test for Modal - Testing if "Submit Your Answer" is present in Answer Modal
describe('AnswerModal', () => {
  // Assuming `selectedQuestion` is a prop you pass to your AnswerModal for the question's ID
  const mockSelectedQuestion = { question_id: 123 }; // Mock question ID
  // Close Mechanism Test
  it('closes when the close button is clicked', async () => {
    const handleClose = jest.fn();

    // Render the AnswerModal with handleClose as the onClose prop
    render(
      <AnswerModal
        isOpen={true}
        onClose={handleClose}
        selectedQuestion={mockSelectedQuestion}
        question="How many colors?"
      />
    );

    // Click the close button (assuming it's text is 'X')
    userEvent.click(screen.getByRole('button', 'X'));

    // Wait and check if handleClose was called
    await waitFor(() => {
      expect(handleClose).toHaveBeenCalled();
    });
  });
});


/////////////////////
//Image Modal Tests//
/////////////////////

// Test to verify if image uploads
describe('ImageModal', () => {
  it('renders correctly with an image', async () => {
    const image = 'https://example.com/test-image.jpg'; // Example image
    render(<ImageModal isOpen={true} image={image} onClose={jest.fn()} />);

    const imageElement = await screen.findByRole('img');
    expect(imageElement).toHaveAttribute('src', image);
  });
});

// Test to verify modal closes by clicking on 'X'
describe('ImageModal close functionality', () => {
  it('calls the onClose handler when close mechanism is triggered', async () => {
    const mockOnClose = jest.fn();
    render(<ImageModal isOpen={true} imageUrl="https://example.com/test-image.jpg" onClose={mockOnClose} />);

    // Assuming there's a button or similar mechanism to close the modal. Replace 'Close' with the actual text or aria-label.
    userEvent.click(screen.getByRole('button', { name: 'X' }));

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});
