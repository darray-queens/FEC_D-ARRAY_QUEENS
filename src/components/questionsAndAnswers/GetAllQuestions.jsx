import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function GetAllQuestions({ currentProduct }) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (currentProduct && currentProduct.id) {
      const url = '/qa/questions';

      console.log('current Prod:', currentProduct);

      axios.get(url, {
        params: {
          product_id: currentProduct.id,
        },
        headers: {
          Authorization: `${process.env.TOKEN}`,
        },
      })
        .then((response) => {
          setQuestions(response.data.results);
        })
        .catch((err) => {
          console.error('failed to set list: ', err);
        });
    }
  }, [currentProduct]); // Corrected dependency array

  return (
    <div>
      <h2>Questions List</h2>
      <ul>
        {questions.map((question) => (
          <li key={question.question_id}>
            <p>
              <strong>Question:</strong>
              {question.question_body}
            </p>
            <p>
              <strong>Asked by:</strong>
              {question.asker_name}
            </p>
            <p>
              <strong>Helpfulness:</strong>
              {question.question_helpfulness}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GetAllQuestions;
