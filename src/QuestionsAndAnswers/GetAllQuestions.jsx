import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GetAllQuestions({ productId }) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const repsonse = await axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/:hr-rfp/', {
          params: {
            product_id: productId
          }
        })
      } catch (error) {
        console.error('failed to fetch questions:', error);
      }
    }
    fetchQuestions();
  }, [productId]);

  return (
    <div>
      <h2>Questions List</h2>
    </div>
  );
}