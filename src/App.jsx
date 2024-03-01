import React from 'react';
import GetAllQuestions from './QuestionsAndAnswers/GetAllQuestions';

const { useState } = React;

function App() {
  const [currentProduct, setCurrentProduct] = useState(null);

  return (
    <div>
      <h2>Howdy, world!!</h2>
      <GetAllQuestions />
    </div>

  );
}

export default App;
