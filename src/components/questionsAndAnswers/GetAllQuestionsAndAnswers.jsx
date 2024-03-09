import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import QuestionsList from './QuestionsList';
import AnswerModal from './AnswerModal';
import QuestionModal from './QuestionModal';
import SearchTerm from './SearchInput';
import LoadMoreButton from './LoadMoreButton';

function GetAllQuestionsAndAnswers({ currentProduct }) {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [visibleQuestions, setVisibleQuestions] = useState(2);
  const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [votedHelpfulness, setVotedHelpfulness] = useState(new Set());
  const [reportedAnswers, setReportedAnswers] = useState(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // New state for tracking current page
  const [isLoading, setIsLoading] = useState(true);

  const pageSize = 55;

  useEffect(() => {
    setQuestions([]);
    setVisibleQuestions(2);
    setCurrentPage(1);

    const fetchQuestions = async () => {
      if (!currentProduct?.id) {
        setIsLoading(true); // Ensure loading state is active if no currentProduct
        return;
      }
      // Make sure currentProduct has an id before proceeding
      if (currentProduct?.id) {
        setIsLoading(true); // Indicate the start of data fetching
        try {
          const response = await axios.get(`/qa/questions?product_id=${currentProduct.id}`, {
            params: { page: currentPage, count: pageSize },
          });
          const fetchedQuestions = response.data.results
            .sort((a, b) => b.question_helpfulness - a.question_helpfulness);
          // Filter out duplicates
          const uniqueQuestions = new Map();
          fetchedQuestions.forEach((question) => {
            uniqueQuestions.set(question.question_id, question);
          });

          setQuestions([...uniqueQuestions.values()]);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching questions:', error);
        } finally {
          setIsLoading(false); // Data fetching is complete
        }
      }
    };

    fetchQuestions();
  }, [currentProduct?.id, currentPage, isSubmitting]);

  useEffect(() => {
    if (searchTerm.length >= 3) {
      const searchLowerCase = searchTerm.toLowerCase();
      const filtered = questions.filter((question) => question.question_body
        .toLowerCase()
        .includes(searchLowerCase)
      );
      setFilteredQuestions(filtered);
    } else {
      setFilteredQuestions(questions);
    }
  }, [searchTerm, questions]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleShowMoreQuestions = () => {
    // Determine new visible questions count, for example, show 5 more questions each time
    const moreQuestionsToShow = 5;
    setVisibleQuestions((prevVisibleQuestions) => prevVisibleQuestions + moreQuestionsToShow);
  };

  const openAnswerModal = (question) => {
    setIsAnswerModalOpen(true);
    setSelectedQuestion(question);
  };
  const openQuestionModal = () => {
    setIsQuestionModalOpen(true);
  };

  const refreshQuestions = async () => {
    try {
      if (currentProduct && currentProduct.id) {
        const response = await axios.get(`/qa/questions?product_id=${currentProduct.id}`, {
          params: { page: currentPage, count: pageSize },
        });
        const updatedQuestions = response.data.results
          .sort((a, b) => b.question_helpfulness - a.question_helpfulness);
        setQuestions(updatedQuestions);
      }
    } catch (error) {
      console.error('Error refreshing questions:', error);
    }
  };

  const markAnswerAsHelpful = async (answerId) => {
    if (!votedHelpfulness.has(answerId)) {
      try {
        await axios.put(`/qa/answers/${answerId}/helpful`);
        setVotedHelpfulness(new Set([...votedHelpfulness, answerId]));
        // Assuming you have a way to update the specific answer's helpfulness count in your state:
        setQuestions((prevQuestions) => prevQuestions.map((q) => {
          if (q.answers[answerId]) {
            const updatedAnswers = { ...q.answers };
            updatedAnswers[answerId].helpfulness += 1;
            return { ...q, answers: updatedAnswers };
          }
          return q;
        }),
       );
      } catch (error) {
        console.error("Error marking answer as helpful:", error);
      }
    }
  };

  const markQuestionAsHelpful = async (questionId) => {
    if (!votedHelpfulness.has(questionId)) {
      try {
        await axios.put(`/qa/questions/${questionId}/helpful`);

        // Add questionId to votedHelpfulness to prevent multiple votes
        setVotedHelpfulness(new Set([...votedHelpfulness, questionId]));

        // Manually increment the helpfulness count for the question in the state
        setQuestions((prevQuestions) =>
          prevQuestions.map((q) => {
            if (q.question_id === questionId) {
              // Assuming you have a 'question_helpfulness' property
              return { ...q, question_helpfulness: q.question_helpfulness + 1 };
            }
            return q;
          }),
        );
      } catch (error) {
        console.error("Error marking question as helpful:", error);
      }
    }
  };

  const reportAnswer = async (answerId) => {
    if (!reportedAnswers.has(answerId)) {
      try {
        await axios.put(`/qa/answers/${answerId}/report`);
        setReportedAnswers(new Set([...reportedAnswers, answerId]));
        // Refresh the component or handle UI changes as necessary.
      } catch (error) {
        console.error("Error reporting answer:", error);
      }
    }
  };

  const toggleExpand = (question) => {
    const updatedQuestions = questions.map((q) => {
      if (q.question_id === question.question_id) {
        return { ...q, expanded: !q.expanded };
      }
      return q;
    });
    setQuestions(updatedQuestions);
  };

  const handleAddAnswer = (questionData) => {
    setIsAnswerModalOpen(true);
    setSelectedQuestion(questionData);
  };

  return (
    <div>
      <SearchTerm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <QuestionsList
        questions={filteredQuestions}
        handleShowMoreQuestions={handleShowMoreQuestions}
        visibleQuestionCount={visibleQuestions}
        markAnswerAsHelpful={markAnswerAsHelpful}
        reportAnswer={reportAnswer}
        markQuestionAsHelpful={markQuestionAsHelpful}
        toggleExpand={toggleExpand}
        reportedAnswers={reportedAnswers}
        openAnswerModal={openAnswerModal}
        openQuestionModal={openQuestionModal}
      />
      {isAnswerModalOpen && (
        <AnswerModal
          isOpen={isAnswerModalOpen}
          onRequestClose={() => setIsAnswerModalOpen(false)}
          productName={currentProduct?.name}
          questionBody={selectedQuestion?.question_body}
          selectedQuestion={selectedQuestion}
          refreshQuestions={refreshQuestions}
          openAnswerModal={openAnswerModal}
        />
      )}
      <div className="button-container">
        <LoadMoreButton className="question-button" onClick={handleShowMoreQuestions} text="More Answered Questions" />
        <button type="button" className="question-button" onClick={() => setIsQuestionModalOpen(true)}>Add a Question ➕</button>
      </div>
      {isQuestionModalOpen && (
        <QuestionModal
          isOpen={isQuestionModalOpen}
          onRequestClose={() => setIsQuestionModalOpen(false)}
          productName={currentProduct?.name}
          currentProduct={currentProduct}
          setIsSubmitting={setIsSubmitting}
          refreshQuestions={refreshQuestions}
          openQuestionModal={openQuestionModal}
        />
      )}
    </div>
  );
}

export default GetAllQuestionsAndAnswers;
