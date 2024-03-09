import React, { useState, useEffect } from 'react';
import AnswersList from './AnswersList';

function QuestionItem({
  reportAnswer, reportedAnswers, openAnswerModal,
  questionData, markQuestionAsHelpful, markAnswerAsHelpful,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <div className="qa-item">
        <div className="qa-label">Q:</div>
        <div className="qa-content">
          <strong>
            {questionData.question_body}
          </strong>
        </div>
        <button
          type="button"
          href="#"
          onClick={(e) => {
            e.preventDefault(); // Prevent default anchor action
            markQuestionAsHelpful(questionData.question_id);
          }}
          className="link"
        >
          Helpful? Yes(
          {questionData.question_helpfulness}
          )
        </button>
        {'  |  '}
        <button
          type="button"
          className="link"
          onClick={() => openAnswerModal(questionData)}
        >
          Add Answer
        </button>
      </div>
      <AnswersList
        answers={questionData.answers}
        markAnswerAsHelpful={markAnswerAsHelpful}
        reportAnswer={reportAnswer}
        isExpanded={isExpanded}
        reportedAnswers={reportedAnswers}
      />
      {' '}
      {Object.keys(questionData.answers).length > 2 && (
        <button type="button" className="load-more-answers" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? 'COLLAPSE ANSWERS' : 'LOAD MORE ANSWERS'}
        </button>
      )}
    </div>
  );
}

export default QuestionItem;
