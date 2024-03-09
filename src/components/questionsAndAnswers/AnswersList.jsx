import React from 'react';
import AnswerItem from './AnswerItem';

function AnswersList({
  answers, markAnswerAsHelpful, reportAnswer, isExpanded, reportedAnswers,
}) {
  const sortedAnswers = Object.values(answers)
    .sort((a, b) => {
      if (a.answerer_name === 'Seller') return -1;
      if (b.answerer_name === 'Seller') return 1;
      return b.helpfulness - a.helpfulness;
    });

  // Display only two answers if not expanded
  const answersToShow = isExpanded ? sortedAnswers : sortedAnswers.slice(0, 2);
  return (
    <div>
      {answersToShow.map((answer) => (
        <AnswerItem
          key={answer.id}
          answerData={answer}
          markAnswerAsHelpful={markAnswerAsHelpful}
          reportAnswer={reportAnswer}
          reportedAnswers={reportedAnswers}
        />
      ))}
    </div>
  );
}

export default AnswersList;
