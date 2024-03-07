import React from 'react';

function QuestionItem({
  question, reportQuestion, toggleExpand, openAnswerModal, reportedQuestions,
}) {
  const {
    question_id, question_body, expanded, answers,
  } = question;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div key={question_id}>
      <p>
        <strong>
          Q:
          {question_body}
        </strong>
        <button type="button" onClick={() => reportQuestion(question_id)}>
          {reportedQuestions.has(question_id) ? 'Reported' : 'Report'}
        </button>
      </p>
      {Object.values(answers).map((answer, index) => (
        <div key={answer.id} style={{ display: index < 2 || expanded ? 'block' : 'none' }}>
          <strong>A:</strong> {answer.body}
          <p>
            by
            <strong>
              {answer.answerer_name === 'Seller' ? <b>Seller</b> : answer.answerer_name}
            </strong>
            ,
            {' '}
            {formatDate(answer.date)}
          </p>
          {/* Add buttons for helpfulness and reporting */}
        </div>
      ))}
      {/* Add Answer button */}
      <button type="button" onClick={() => openAnswerModal(question)}>Add Answer</button>
    </div>
  );
}

export default QuestionItem;
