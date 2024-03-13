import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import GetAllQuestionsAndAnswers from '../components/questionsAndAnswers/GetAllQuestionsAndAnswers';
import AnswerItem from '../components/questionsAndAnswers/AnswerItem';
import QuestionModal from '../components/questionsAndAnswers/QuestionModal';
import AnswerModal from '../components/questionsAndAnswers/AnswerModal';
import ImageModal from '../components/questionsAndAnswers/ImageModal';
import SearchTerm from '../components/questionsAndAnswers/SearchInput';
import QuestionItem from '../components/questionsAndAnswers/QuestionItem';
import QuestionsList from '../components/questionsAndAnswers/QuestionsList';
import LoadMoreButton from '../components/questionsAndAnswers/LoadMoreButton';
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

  const mockData = {
    data: {
      results: [],
    },
  };

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

  it('fetches questions on component mount and displays them', async () => {
    axios.get.mockResolvedValue({ data: sampleQuestionData });

    render(<GetAllQuestionsAndAnswers currentProduct={{ id: '40344', name: 'Test Product' }} />);

    await waitFor(() => expect(screen.getByText("How many colors")).toBeInTheDocument());

    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining(`/qa/questions?product_id=40344`), expect.anything());
  });

  it('loads more questions when Load More button is clicked', async () => {
    const user = userEvent.setup();

    axios.get.mockResolvedValueOnce({ data: sampleQuestionData });

    render(<GetAllQuestionsAndAnswers currentProduct={{ id: '40344', name: 'Test Product' }} />);

    await waitFor(() => expect(screen.getByText(/How many colors/)).toBeInTheDocument());

    const loadMoreButton = screen.getByText(/More Answered Questions/);
    await user.click(loadMoreButton);
  });

  it('opens the QuestionModal when the Add a Question button is clicked', async () => {
    const user = userEvent.setup();

    // Mock axios to resolve immediately with your test data to simulate the API call
    axios.get.mockResolvedValueOnce({ data: { results: [] } });

    render(<GetAllQuestionsAndAnswers currentProduct={{ id: '123', name: 'Test Product' }} />);

    // Wait for the component to finish loading
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

    await user.click(screen.getByText(/Add a Question ➕/));

    // Verify the QuestionModal is open
    expect(screen.getByText(/Ask Your Question/)).toBeInTheDocument(); // Adjust if necessary based on your modal's content
  });

  it('closes the QuestionModal when the close action is triggered', async () => {
    const user = userEvent.setup();
    axios.get.mockResolvedValueOnce({ data: { results: [] } });
    render(<GetAllQuestionsAndAnswers currentProduct={{ id: '123', name: 'Test Product' }} />);
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
    await user.click(screen.getByText(/Add a Question ➕/));
    const closeButton = await screen.findByRole('button', { name: 'Close' });
    // Click the "Close" button to close the modal
    await user.click(closeButton);
    expect(screen.queryByText(/Ask Your Question/)).not.toBeInTheDocument(); // Adjust based on your modal's content
  });

  it('shows loading initially', async () => {
    render(<GetAllQuestionsAndAnswers currentProduct={{ id: '1', name: 'Sample Product' }} />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('removes loading after data is fetched', async () => {
    render(<GetAllQuestionsAndAnswers currentProduct={{ id: '1', name: 'Sample Product' }} />);
    await waitFor(() => expect(screen.queryByText(/Loading.../i)).toBeNull());
  });

  // Example test to check if "More Answered Questions" button appears
  it('shows "More Answered Questions" button after loading', async () => {
    render(<GetAllQuestionsAndAnswers currentProduct={{ id: '1', name: 'Sample Product' }} />);
    await waitFor(() => expect(screen.getByText(/More Answered Questions/i)).toBeInTheDocument());
  });

  // Test for visibility of "Add a Question" button
  it('displays "Add a Question" button', async () => {
    render(<GetAllQuestionsAndAnswers currentProduct={{ id: '1', name: 'Sample Product' }} />);
    await waitFor(() => expect(screen.getByText(/Add a Question ➕/i)).toBeInTheDocument());
  });

  // Mock function for testing modal interactions
  const mockOpenQuestionModal = jest.fn();

  // This test assumes you have a mechanism to close the modal
  it('closes QuestionModal when close action is triggered', async () => {
    // You'd need to implement logic to show the modal first, then trigger its close action
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
    photos: ['https://example.com/photo1.jpg']
  };

  const reportedAnswers = new Set();

  it('renders the answer content', () => {
    render(<AnswerItem answerData={mockAnswer} reportedAnswers={reportedAnswers} />);
    expect(screen.getByText(/DAIRY QUEENS/i)).toBeInTheDocument();
    expect(screen.getByText(/da queens/i)).toBeInTheDocument();
  });

  it('opens ImageModal when an image is clicked', async () => {
    render(<AnswerItem answerData={mockAnswer} reportedAnswers={reportedAnswers} markAnswerAsHelpful={() => {}} reportAnswer={() => {}} />);

    const user = userEvent.setup();
    const imageThumbnail = screen.getByAltText('Thumbnail');
    await user.click(imageThumbnail);

    const images = await screen.findAllByRole('img');
    const modalImage = images.find(img => img.alt === "Full size");
    expect(modalImage).toHaveAttribute('src', 'https://example.com/photo1.jpg');
  });

  it('formats the date correctly', () => {
    render(<AnswerItem answerData={mockAnswer} reportedAnswers={reportedAnswers} markAnswerAsHelpful={() => {}} reportAnswer={() => {}} />);

    expect(screen.getByText(/March 7, 2024/)).toBeInTheDocument();
  });

  it('marks an answer as helpful when "Helpful? Yes" is clicked', async () => {
    const mockMarkAnswerAsHelpful = jest.fn();
    render(<AnswerItem answerData={mockAnswer} reportedAnswers={reportedAnswers} markAnswerAsHelpful={mockMarkAnswerAsHelpful} reportAnswer={() => {}} />);

    const user = userEvent.setup();
    await user.click(screen.getByText(/Helpful\? Yes/));

    expect(mockMarkAnswerAsHelpful).toHaveBeenCalledWith(mockAnswer.id);
  });

  it('displays "Reported" instead of "Report" link for reported answers', () => {
    // Simulate that the answer has been reported
    const newReportedAnswers = new Set([mockAnswer.id]);
    render(<AnswerItem answerData={mockAnswer} reportedAnswers={newReportedAnswers} markAnswerAsHelpful={() => {}} reportAnswer={() => {}} />);

    expect(screen.getByText('Reported')).toBeInTheDocument();
    expect(screen.queryByText('Report')).not.toBeInTheDocument();
  });
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
  // Mocks and setup
  const mockSelectedQuestion = { question_id: 123 }; // Example selected question
  const mockProductName = "Product Name"; // Example product name
  const mockQuestionBody = "What is the question?"; // Example question body
  const mockRefreshQuestions = jest.fn(); // Mock function for refreshing questions

  it('closes when the close button is clicked', async () => {
    const handleClose = jest.fn();

    render(
      <AnswerModal
        isOpen={true}
        onRequestClose={handleClose}
        productName={mockProductName}
        questionBody={mockQuestionBody}
        selectedQuestion={mockSelectedQuestion}
        refreshQuestions={mockRefreshQuestions}
      />
    );

    // Assume your close button text content is 'Close'
    userEvent.click(screen.getByRole('button', { name: 'Close' }));

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


////////////////////////
// Question Item Test //
////////////////////////

describe('QuestionItem', () => {
  const mockReportAnswer = jest.fn();
  const mockReportedAnswers = new Set();
  const mockOpenAnswerModal = jest.fn();
  const mockQuestionData = {
    question_id: 1,
    question_body: "What is the meaning of life?",
    question_helpfulness: 42,
    answers: {
      1: { body: "42", helpfulness: 2 },
      2: { body: "To live.", helpfulness: 1 },
      3: { body: "Enjoy every moment.", helpfulness: 3 }
    },
  };
  const mockMarkQuestionAsHelpful = jest.fn();
  const mockMarkAnswerAsHelpful = jest.fn();

  beforeEach(() => {
    render(<QuestionItem
      reportAnswer={mockReportAnswer}
      reportedAnswers={mockReportedAnswers}
      openAnswerModal={mockOpenAnswerModal}
      questionData={mockQuestionData}
      markQuestionAsHelpful={mockMarkQuestionAsHelpful}
      markAnswerAsHelpful={mockMarkAnswerAsHelpful}
    />);
  });

  it('renders correctly with given question data', () => {
    expect(screen.getByText(/What is the meaning of life?/)).toBeInTheDocument();
    const helpfulButtons = screen.getAllByText(/Helpful\? Yes\(/);
    expect(helpfulButtons.length).toBeGreaterThan(0);
    expect(screen.getByText(/Add Answer/)).toBeInTheDocument();
  });

  it('calls markQuestionAsHelpful when helpful button is clicked', async () => {
    const user = userEvent.setup();
    const helpfulButton = screen.getAllByText(/Helpful\? Yes\(/)[0];
    await user.click(helpfulButton);

    expect(mockMarkQuestionAsHelpful).toHaveBeenCalledWith(mockQuestionData.question_id);
  });

  it('calls openAnswerModal with question data when Add Answer is clicked', async () => {
    const addAnswerButton = screen.getByText(/Add Answer/);
    fireEvent.click(addAnswerButton);

    expect(mockOpenAnswerModal).toHaveBeenCalledWith(mockQuestionData);
  });

  it('toggles the expanded state and button text for answers', async () => {
    const user = userEvent.setup();
    const toggleButton = screen.getByText(/LOAD MORE ANSWERS/);

    // First click should expand answers and change button text
    await user.click(toggleButton);
    expect(toggleButton).toHaveTextContent(/COLLAPSE ANSWERS/);

    // Second click should collapse answers and revert button text
    await user.click(toggleButton);
    expect(toggleButton).toHaveTextContent(/LOAD MORE ANSWERS/);
  });
});

//////////////////////////
// Questions List Tests //
//////////////////////////

