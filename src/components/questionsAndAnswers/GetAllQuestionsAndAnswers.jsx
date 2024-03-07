import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import AnswerModal from './AnswerModal';
import QuestionModal from './QuestionModal';

function GetAllQuestionsAndAnswers({ currentProduct }) {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleQuestions, setVisibleQuestions] = useState(Math.min(4, questions.length));
  const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [votedHelpfulness, setVotedHelpfulness] = useState(new Set());
  const [reportedAnswers, setReportedAnswers] = useState(new Set());
  const [reportedQuestions, setReportedQuestions] = useState(new Set());

  const refreshQuestions = async () => {
    console.log('currentProduct', currentProduct);
    console.log('Refreshing questions...');
    if (currentProduct === undefined || currentProduct === null) {
      console.log('currentProduct is either undefined or null');
    }
    console.log('Current product:', currentProduct);
    try {
      const response = await axios.get(`/qa/questions?product_id=${currentProduct.id}`, {
        params: { page: 1, count: 100 },
      });
      console.log('Response data:', response.data); // Log the response data
      const sortedQuestions = response.data.results
        .sort((a, b) => b.question_helpfulness - a.question_helpfulness);
      console.log('Sorted questions:', sortedQuestions); // Log the sorted questions
      setQuestions(sortedQuestions);
    } catch (error) {
      console.error('Error refreshing questions:', error);
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      refreshQuestions();
      if (currentProduct && currentProduct.id) {
        try {
          const response = await axios.get('/qa/questions', {
            params: { product_id: currentProduct.id, page: currentPage, count: 5 },
          });
          const filteredQuestions = response.data.results
            .filter((question) => searchTerm.length < 3 || question.question_body
              .toLowerCase()
              .includes(searchTerm.toLowerCase()));
          setQuestions(filteredQuestions
            .sort((a, b) => b.question_helpfulness - a.question_helpfulness));
        } catch (error) {
          console.error('Error fetching questions:', error);
        }
      }
    };

    fetchQuestions();
  }, [currentProduct, currentPage]);

  const handleShowMoreQuestions = () => {
    const remainingQuestions = questions.length - visibleQuestions;
    const increment = Math.min(5, remainingQuestions);
    setVisibleQuestions(visibleQuestions + increment);
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

  const reportQuestion = async (questionId) => {
    if (reportedQuestions.has(questionId)) {
      return;
    }

    await axios.put(`/qa/questions/${questionId}/report`, {}, {
      headers: { Authorization: `Bearer ${process.env.TOKEN}` },
    });
    const newReportedQuestions = new Set(reportedQuestions);
    newReportedQuestions.add(questionId);
    setReportedQuestions(newReportedQuestions);
    localStorage.setItem('reportedQuestions', JSON.stringify(Array.from(newReportedQuestions)));
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
        <h2>Questions & Answers</h2>
        <input
          type="text"
          placeholder="Have a question? Search for answers…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '50%', padding: '10px', marginBottom: '20px' }}
        />
      </div>
      <button type="button" onClick={openQuestionModal} className="open-button">Add a Question</button>
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
                  {' '}
                  {question.question_body}
                </strong>
                <button type="button" onClick={() => reportQuestion(question.question_id)}>
                  {reportedQuestions.has(question.question_id) ? 'Reported' : 'Report'}
                </button>
              </p>
              {question.answers && Object.values(question.answers).map((answer, index) => (
                <div key={answer.id} style={{ display: index < 2 || question.expanded ? 'block' : 'none' }}>
                  <strong>
                    A:
                    {' '}
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
                  {' '}
                  <button type="button" onClick={() => reportAnswer(answer.id)}>
                    {reportedAnswers.has(answer.id) ? 'Reported' : 'Report'}
                  </button>
                </div>
              ))}
              {Object.values(question.answers).length > 2 && (
                <button type="button" style={{ background: 'red', padding: '5px' }} onClick={() => toggleExpand(question)}>
                  {question.expanded ? 'Collapse answers' : 'See more answers'}
                </button>
              )}
              {' '}
              <button type="button" style={{ padding: '5px' }} onClick={() => openAnswerModal(question)}>Add Answer</button>
            </div>
          ))}
        {visibleQuestions < questions.length && (
          <button type="button" onClick={handleShowMoreQuestions}>More Questions</button>
        )}
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
          refreshQuestions={refreshQuestions}
          currentPage={currentPage}
          questions={questions} // Pass questions state as prop
          setQuestions={setQuestions}
        />
      )}
    </div>
  );
}

export default GetAllQuestionsAndAnswers;
