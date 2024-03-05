import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnswerModal from './AnswerModal';
import './styles.css';

function GetAllQuestionsAndAnswers({ currentProduct }) {
  const [questions, setQuestions] = useState([]);
  const [visibleQuestions, setVisibleQuestions] = useState(2);
  const [showAllAnswers, setShowAllAnswers] = useState({});
  const [reportedAnswers, setReportedAnswers] = useState(new Set());
  const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const fetchQuestions = async () => {
    if (currentProduct && currentProduct.id) {
      try {
        const response = await axios.get(`/qa/questions?product_id=${currentProduct.id}`, {
          params: {
            page: 1,
            count: 5,
          },
        });
        const sortedQuestions = response.data.results
          .sort((a, b) => b.question_helpfulness - a.question_helpfulness);
        setQuestions(sortedQuestions);

        const initialShowAllAnswers = sortedQuestions
          .reduce((acc, question) => ({ ...acc, [question.question_id]: false }), {});
        setShowAllAnswers(initialShowAllAnswers);
      } catch (error) {
        console.error('Error getting QUESTIONS', error);
      }
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [currentProduct]);

  const handleShowMoreQuestions = () => {
    setVisibleQuestions((prev) => prev + 4);
  };

  const toggleShowAllAnswers = (questionId) => {
    setShowAllAnswers((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const openAnswerModal = (question) => {
    setIsAnswerModalOpen(true);
    setSelectedQuestion(question);
  };

  const markAnswerAsHelpful = async (answerId) => {
    try {
      await axios.put(`/qa/answers/${answerId}/helpful`);
      fetchQuestions();
    } catch (error) {
      console.error('Error marking answer as helpful', error);
    }
  };

  const reportAnswer = async (answerId) => {
    if (reportedAnswers.has(answerId)) return;
    try {
      await axios.put(`/qa/answers/${answerId}/report`);
      setReportedAnswers((prev) => new Set(prev.add(answerId)));
    } catch (error) {
      console.error('Error reporting answer', error);
    }
  };

  const renderAnswers = (answers, questionId) => {
    const answersArray = Object.values(answers).sort((a, b) => b.helpfulness - a.helpfulness);

    return (
      <>
        {answersArray.slice(0, showAllAnswers[questionId] ? undefined : 2).map((answer) => (
          <div key={answer.id} style={{ marginBottom: '10px' }}>
            <p>
              <strong>
                A:
              </strong>
              {answer.body}
            </p>
            <p>
              {' '}
              by
              {' '}
              <strong>
                {answer.answerer_name === 'Seller' ? <b>{answer.answerer_name}</b> : answer.answerer_name}
              </strong>
              ,
              {new Date(answer.date).toLocaleDateString()}
            </p>
            <button type="button" onClick={() => markAnswerAsHelpful(answer.id)}>
              Helpful? Yes (
              {answer.helpfulness}
              )
            </button>
            {reportedAnswers.has(answer.id) ? <span> Reported</span> : <button type="button" onClick={() => reportAnswer(answer.id)}>Report</button>}
          </div>
        ))}
        {Object.keys(answers).length > 2 && (
          <button type="button" onClick={() => toggleShowAllAnswers(questionId)}>
            {showAllAnswers[questionId] ? 'Collapse answers' : 'See more answers'}
          </button>
        )}
      </>
    );
  };

  return (
    <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
      <h2>Questions & Answers</h2>
      {questions.length > 0 ? (
        <ul>
          {questions.slice(0, visibleQuestions).map((question) => (
            <li key={question.question_id}>
              <p>
                <strong>
                  Q:
                </strong>
                {question.question_body}
              </p>
              {renderAnswers(question.answers, question.question_id)}
              <button type="button" onClick={() => openAnswerModal(question)}>Add Answer</button>
            </li>
          ))}
          {visibleQuestions < questions.length
          && <button type="button" onClick={handleShowMoreQuestions}>More Answered Questions</button>}
        </ul>
      ) : <p>No questions have been submitted for this product.</p>}
      <AnswerModal
        isOpen={isAnswerModalOpen}
        onRequestClose={() => setIsAnswerModalOpen(false)}
        productName={currentProduct.name}
        questionBody={selectedQuestion?.question_body}
        // Plus any other props required for submission and input handling
      />
    </div>
  );
}

export default GetAllQuestionsAndAnswers;
