import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import AnswerModal from './AnswerModal';
import QuestionModal from './QuestionModal';

function GetAllQuestionsAndAnswers({ currentProduct }) {
  const [questions, setQuestions] = useState([]);
  const [visibleQuestions, setVisibleQuestions] = useState(2);
  const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [votedHelpfulness, setVotedHelpfulness] = useState(new Set());
  const [reportedAnswers, setReportedAnswers] = useState(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // New state for tracking current page

  const pageSize = 55;

  useEffect(() => {
    setQuestions([]);
    setVisibleQuestions(2);
    setCurrentPage(1);

    const fetchQuestions = async () => {
      if (currentProduct && currentProduct.id) {
        try {
          const response = await axios.get(`/qa/questions?product_id=${currentProduct.id}`, {
            params: { page: currentPage, count: pageSize },
          });
          // Append fetched questions to existing ones
          setQuestions((prevQuestions) => [...prevQuestions, ...response.data.results
            .sort((a, b) => b.question_helpfulness - a.question_helpfulness)]);
        } catch (error) {
          console.error('Error fetching questions:', error);
        }
      }
    };

    // Check if isSubmitting has been set to false, indicating submission is complete
    if (!isSubmitting) {
      // Set a delay before fetching the updated questions
      const delay = 2000; // Delay in milliseconds (e.g., 2000ms = 2 seconds)
      const timerId = setTimeout(() => {
        fetchQuestions();
      }, delay);

      // Cleanup function to clear the timeout if the component unmounts
      return () => clearTimeout(timerId);
    }
  }, [currentProduct, isSubmitting, currentPage]);

  useEffect(() => {
    console.log('Updated questions state:', questions);
  }, [questions]);

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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const refreshQuestions = async () => {
    try {
      if (currentProduct && currentProduct.id) {
        const response = await axios.get(`/qa/questions?product_id=${currentProduct.id}`, {
          params: { page: 1, count: 5 },
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
    if (votedHelpfulness.has(answerId)) {
      return;
    }
    await axios.put(`/qa/answers/${answerId}/helpful`, {});
    const newVotedHelpfulness = new Set(votedHelpfulness);
    newVotedHelpfulness.add(answerId);
    setVotedHelpfulness(newVotedHelpfulness);
    localStorage.setItem('votedHelpfulness', JSON.stringify(Array.from(newVotedHelpfulness)));
  };

  const markQuestionAsHelpful = async (questionId) => {
    if (votedHelpfulness.has(questionId)) {
      return;
    }
    await axios.put(`/qa/questions/${questionId}/helpful`, {});
    const newVotedHelpfulness = new Set(votedHelpfulness);
    newVotedHelpfulness.add(questionId);
    setVotedHelpfulness(newVotedHelpfulness);
    localStorage.setItem('votedHelpfulness', JSON.stringify(Array.from(newVotedHelpfulness)));
  };

  const reportAnswer = async (answerId) => {
    if (reportedAnswers.has(answerId)) {
      return;
    }

    const newReportedAnswers = new Set([...reportedAnswers, answerId]);
    setReportedAnswers(newReportedAnswers);

    await axios.put(`/qa/answers/${answerId}/report`, {});
    newReportedAnswers.add(answerId);
    localStorage.setItem('reportedAnswers', JSON.stringify([...newReportedAnswers]));
    setReportedAnswers(new Set(newReportedAnswers));
    refreshQuestions();
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

  return (
    <div>
      <div>
        <div className="regular-text">
          <h2>Questions & Answers</h2>
        </div>
        <input
          type="text"
          placeholder="Have a question? Search for answers…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
        />
      </div>
      <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
        {questions
          .filter((question) => searchTerm.length < 3
            || question.question_body.toLowerCase().includes(searchTerm.toLowerCase()))
          .slice(0, visibleQuestions)
          .map((question) => (
            <div key={question.question_id}>
              <p>
                <div className="boldest-text">
                  Q:
                  {question.question_body}
                </div>
                <span style={{ float: 'right' }}>
                  Helpful? (
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      markQuestionAsHelpful(question.question_id)
                    }}
                    className="link"
                    disabled={votedHelpfulness.has(question.question_id)}
                  >
                    Yes (
                    {question.question_helpfulness + (votedHelpfulness
                      .has(question.question_id) ? 1 : 0)}
                    )
                  </a>
                  )
                  {' '}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      openAnswerModal(question)
                    }}
                    className="link"
                    style={{ marginLeft: '10px' }}
                  >
                    Add Answer
                  </a>
                </span>
              </p>
              {Object.values(question.answers).map((answer, index) => (
                <div key={answer.id} style={{ fontSize: '12px', display: index < 2 || question.expanded ? 'block' : 'none' }}>
                  <div>
                    <p>
                      <strong>A: </strong>
                      {answer.body}
                    </p>
                    <div className="answerInfo">
                      <p>
                        {' '}
                        by
                        {' '}
                        {answer.answerer_name === 'Seller' ? <b>Seller</b> : answer.answerer_name}
                        ,
                        {' '}
                        <small>
                          {formatDate(answer.date)}
                        </small>
                        {' '}
                        |
                        {' '}
                        <span>
                          Helpful? (
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              markAnswerAsHelpful(answer.id)
                            }}
                            className="link"
                            disabled={votedHelpfulness.has(answer.id)}
                            >
                            Yes (
                            {answer.helpfulness + (votedHelpfulness.has(answer.id) ? 1 : 0)}
                            )
                          </a>
                          )
                        </span>
                        {' '}
                        |
                        {' '}
                        <span>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              reportAnswer(answer.id)
                            }}
                            className="link"
                            >
                          {reportedAnswers.has(answer.id) ? 'Reported' : 'Report'}
                          </a>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {Object.values(question.answers).length > 2 && (
                <span
                  style={{ marginLeft: '26px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', color: '#000' }}
                  onClick={() => toggleExpand(question)}
                >
                  {question.expanded ? 'COLLAPSE ANSWERS' : 'LOAD MORE ANSWERS'}
                </span>
              )}
            </div>
          ))}
          <div>
            {visibleQuestions < questions.length && (
              <button type="button" onClick={handleShowMoreQuestions} className="question-button">MORE ANSWERED QUESTIONS</button>
            )}
            <button type="button" onClick={openQuestionModal} className="question-button">ADD A QUESTION ➕</button>
          </div>
      </div>
      <AnswerModal
        isOpen={isAnswerModalOpen}
        onRequestClose={() => setIsAnswerModalOpen(false)}
        productName={currentProduct?.name}
        questionBody={selectedQuestion?.question_body}
        selectedQuestion={selectedQuestion}
      />
      {currentProduct && (
        <QuestionModal
          isOpen={isQuestionModalOpen}
          onRequestClose={() => setIsQuestionModalOpen(false)}
          productName={currentProduct.name}
          currentProduct={currentProduct}
          setIsSubmitting={setIsSubmitting}
          refreshQuestions={refreshQuestions}
          questions={questions}
        />
      )}
    </div>
  );
}

export default GetAllQuestionsAndAnswers;