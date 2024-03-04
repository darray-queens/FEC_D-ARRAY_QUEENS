import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GetAllQuestionsAndAnswers({ currentProduct }) {
  const [questions, setQuestions] = useState([]);
  const [visibleQuestions, setVisibleQuestions] = useState(4);

  useEffect(() => {
    if (currentProduct && currentProduct.id) {
      // const url = '/qa/questions';

      const fetchQuestions = async () => {
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
        } catch (error) {
          console.error('Error getting QUESTIONS', error);
        }
      };
      fetchQuestions();
    }
  }, [currentProduct]);

  const handleShowMoreQuestions = () => {
    console.log('Button has been pressed');
    setVisibleQuestions((prev) => {
      console.log('Previous visible questions:', prev, 'New visible:', prev + 4);
      return prev + 4;
    });
  };

  const renderAnswers = (answers) => {
    const answersArray = Object.values(answers).sort((a, b) => b.helpfulness - a.helpfulness);
    return answersArray.slice(0, 2).map((answer) => (
      <div key={answer.id}>
        <p>
          {answer.body}
          {' '}
        </p>
        <p>
          <small>
            Answered by -
          </small>
          {' '}
          <strong>
            {answer.answerer_name}
          </strong>
        </p>
        <p>
          {' '}
          on
          {' '}
          {new Date(answer.date).toLocaleDateString()}
        </p>
      </div>
    ));
  };

  return (
    <div>
      <h2>Questions & Answers</h2>
      {questions.length > 0 ? (
        <ul>
          {questions.slice(0, visibleQuestions).map((question) => (
            <li key={question.question_id}>
              <p>{question.question_body}</p>
              <div>{renderAnswers(question.answers)}</div>
            </li>
          ))}
          {visibleQuestions < questions.length && (
            <button type="button" onClick={handleShowMoreQuestions}>More Answered Questions</button>
          )}
        </ul>
      ) : (
        <p>No questions have been submitted for this product.</p>
      )}
      {/* Add add question option here */}
    </div>
  );
}

export default GetAllQuestionsAndAnswers;
