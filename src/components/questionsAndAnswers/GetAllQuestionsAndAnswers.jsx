import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnswerModal from './AnswerModal';
import './styles.css';

function GetAllQuestionsAndAnswers({ currentProduct }) {
  const [questions, setQuestions] = useState([]);
  const [visibleQuestions, setVisibleQuestions] = useState(2);
  const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState({});

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
              <button type="button" onClick={() => openAnswerModal(question)}>Add Answer</button>
            </li>
          ))}
          {visibleQuestions < questions.length
          && <button type="button" onClick={handleShowMoreQuestions}>More Questions</button>}
        </ul>
      ) : <p>No questions have been submitted for this product.</p>}
      <AnswerModal
        isOpen={isAnswerModalOpen}
        onRequestClose={() => setIsAnswerModalOpen(false)}
        productName={currentProduct?.name}
        questionBody={selectedQuestion.question_body}
      />
    </div>
  );
}

export default GetAllQuestionsAndAnswers;
