import React from 'react';
import { useState } from 'react';
import GetAllQuestions from './QuestionsAndAnswers/GetAllQuestions.jsx'

const App = () => {

  const [currentProduct, setCurrentProduct] = useState(null)

  return (
  <div>
    <h2>Howdy, world!!</h2>
    <GetAllQuestions />
    </div>

  )
};
export default App;