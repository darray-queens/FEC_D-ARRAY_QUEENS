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
  const [reportedQuestions, setReportedQuestions] = useState(new Set());

  useEffect(() => {
    const fetchQuestions = async () => {
      if (currentProduct && currentProduct.id) {
        try {
          const response = await axios.get(`/qa/questions?product_id=${currentProduct.id}`, {
            params: { page: 1, count: 5 },
          });
          setQuestions(response.data.results
            .sort((a, b) => b.question_helpfulness - a.question_helpfulness));
        } catch (error) {
          console.error('Error getting QUESTIONS', error);
        }
      }
    };

    fetchQuestions();
  }, [currentProduct]);

  const handleShowMoreQuestions = () => setVisibleQuestions((prev) => prev + 4);

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

  const refreshQuestions = () => {
    const fetchQuestions = async () => {
      if (currentProduct && currentProduct.id) {
        try {
          const response = await axios.get(`/qa/questions?product_id=${currentProduct.id}`, {
            params: { page: 1, count: 5 },
          });
          setQuestions(response.data.results
            .sort((a, b) => b.question_helpfulness - a.question_helpfulness));
        } catch (error) {
          console.error('Error getting QUESTIONS', error);
        }
      }
    };

    fetchQuestions();
  };

  const markAnswerAsHelpful = async (answerId) => {
    if (votedHelpfulness.has(answerId)) {
      console.log("You've already marked this as helpful");
      return;
    }

    try {
      await axios.put(`/qa/answers/${answerId}/helpful`, {});
      const newVotedHelpfulness = new Set(votedHelpfulness);
      newVotedHelpfulness.add(answerId);
      setVotedHelpfulness(newVotedHelpfulness);
      localStorage.setItem('votedHelpfulness', JSON.stringify(Array.from(newVotedHelpfulness)));
    } catch (error) {
      console.error('Error marking answer as helpful', error);
    }
  };

  const reportAnswer = async (answerId) => {
    if (reportedAnswers.has(answerId)) {
      console.log('This answer has already been reported');
      return;
    }

    const newReportedAnswers = new Set([...reportedAnswers, answerId]);
    setReportedAnswers(newReportedAnswers);

    try {
      await axios.put(`/qa/answers/${answerId}/report`, {});
      newReportedAnswers.add(answerId);
      localStorage.setItem('reportedAnswers', JSON.stringify([...newReportedAnswers]));
      setReportedAnswers(new Set(newReportedAnswers));
      refreshQuestions();
    } catch (error) {
      console.error('Error reporting answer', error);
    }
  };

  const reportQuestion = async (questionId) => {
    if (reportedQuestions.has(questionId)) {
      console.log('This question has already been reported.');
      return;
    }

    try {
      await axios.put(`/qa/questions/${questionId}/report`, {}, {
        headers: { Authorization: `Bearer ${process.env.TOKEN}` },
      });
      const newReportedQuestions = new Set(reportedQuestions);
      newReportedQuestions.add(questionId);
      setReportedQuestions(newReportedQuestions);
      localStorage.setItem('reportedQuestions', JSON.stringify(Array.from(newReportedQuestions)));
      refreshQuestions();
    } catch (error) {
      console.error('Error reporting question:', error);
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

  return (
    <div>
      <div>
        <h2>Questions & Answers</h2>
        <input
          type="text"
          placeholder="Have a question? Search for answers…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
        />
        <button type="button" onClick={openQuestionModal} className="open-button">Add a Question</button>
      </div>
      <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
        {questions
          .filter((question) => searchTerm.length < 3
            || question.question_body.toLowerCase().includes(searchTerm.toLowerCase()))
          .slice(0, visibleQuestions)
          .map((question) => (
            <div key={question.question_id}>
              <p>
                <strong>
                  Q:
                  {question.question_body}
                </strong>
                <button type="button" onClick={() => reportQuestion(question.question_id)}>
                  {reportedQuestions.has(question.question_id) ? 'Reported' : 'Report'}
                </button>
              </p>
              {Object.values(question.answers).map((answer, index) => (
                <div key={answer.id} style={{ display: index < 2 || question.expanded ? 'block' : 'none' }}>
                  <strong>
                    A:
                  </strong>
                  {answer.body}
                  <p>
                    by
                    {' '}
                    <strong>
                      {answer.answerer_name === 'Seller' ? <b>Seller</b> : answer.answerer_name}
                    </strong>
                    ,
                    {' '}
                    {formatDate(answer.date)}
                  </p>
                  <button type="button" disabled={votedHelpfulness.has(answer.id)} onClick={() => markAnswerAsHelpful(answer.id)}>
                    Helpful? (
                    {answer.helpfulness + (votedHelpfulness.has(answer.id) ? 1 : 0)}
                    )
                  </button>
                  <button type="button" onClick={() => reportAnswer(answer.id)}>
                    {reportedAnswers.has(answer.id) ? 'Reported' : 'Report'}
                  </button>
                </div>
              ))}
              {Object.values(question.answers).length > 2 && (
                <button type="button" onClick={() => toggleExpand(question)}>
                  {question.expanded ? 'Collapse answers' : 'See more answers'}
                </button>
              )}
              <button type="button" onClick={() => openAnswerModal(question)}>Add Answer</button>
            </div>
          ))}
        {visibleQuestions < questions.length && (
          <button type="button" onClick={handleShowMoreQuestions}>More Questions</button>
        )}
      </div>
      {/* <button type="button" onClick={openQuestionModal} className="open-button">Add a Question</button> */}
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
          refreshQuestions={refreshQuestions}
        />
      )}
    </div>
  );
}

export default GetAllQuestionsAndAnswers;
