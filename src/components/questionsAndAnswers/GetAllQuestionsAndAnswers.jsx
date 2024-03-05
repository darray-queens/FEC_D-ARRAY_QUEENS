import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnswerModal from './AnswerModal';
import QuestionModal from './QuestionModal';
import './styles.css';

function GetAllQuestionsAndAnswers({ currentProduct }) {
  const [questions, setQuestions] = useState([]);
  const [visibleQuestions, setVisibleQuestions] = useState(2);
  const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

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

  useEffect(() => {
    fetchQuestions();
  }, [currentProduct]);

  const handleShowMoreQuestions = () => setVisibleQuestions((prev) => prev + 2);

  const openAnswerModal = (question) => {
    setIsAnswerModalOpen(true);
    setSelectedQuestion(question);
  };
  const openQuestionModal = () => {
    setIsQuestionModalOpen(true);
  };

  return (
    <div>
      <h2>Questions & Answers</h2>
      <input
        type="text"
        placeholder="Have a question? Search for answers…"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
      />
      <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
        {questions
          .filter((question) => (searchTerm.length >= 3
            ? question.question_body.toLowerCase().includes(searchTerm.toLowerCase())
            : true))
          .slice(0, visibleQuestions)
          .map((question) => (
            <div key={question.question_id}>
              <p>
                <strong>
                  Q:
                </strong>
                {question.question_body}
              </p>
              <button type="button" onClick={() => openAnswerModal(question)}>Add Answer</button>
              {/* Additional code to render answers, if applicable */}
            </div>
          ))}
        {visibleQuestions < questions.length && (
          <button type="button" onClick={handleShowMoreQuestions}>More Questions</button>
        )}
      </div>
      <button type="button" onClick={openQuestionModal} className="open-button">Add a Question</button>
      <AnswerModal
        isOpen={isAnswerModalOpen}
        onRequestClose={() => setIsAnswerModalOpen(false)}
        productName={currentProduct?.name}
        questionBody={selectedQuestion?.question_body}
      />
      <QuestionModal
        isOpen={isQuestionModalOpen}
        onRequestClose={() => setIsQuestionModalOpen(false)}
        productName={currentProduct?.name}
      />
    </div>
  );
}

export default GetAllQuestionsAndAnswers;
