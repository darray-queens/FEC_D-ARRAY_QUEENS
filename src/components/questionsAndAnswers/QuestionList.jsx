import React from 'react';
import QuestionItem from './QuestionItem';

function QuestionList({ questions }) {
  return (
    <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
      {questions.map((question) => (
        <QuestionItem key={question.question_id} question={question} />
      ))}
    </div>
  );
}

export default QuestionList;
