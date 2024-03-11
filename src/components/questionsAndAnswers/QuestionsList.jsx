import React from 'react';
import QuestionItem from './QuestionItem';
import LoadMoreButton from './LoadMoreButton';

function QuestionsList({
  openAnswerModal, reportAnswer, markQuestionAsHelpful, toggleExpand, reportedAnswers,
  questions, visibleQuestionCount, markAnswerAsHelpful,
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, overflowY: 'auto', maxHeight: '50vh' }}>
        {questions.slice(0, visibleQuestionCount).map((question) => (
          <QuestionItem
            key={question.question_id}
            questionData={question}
            reportAnswer={reportAnswer}
            markAnswerAsHelpful={markAnswerAsHelpful}
            openAnswerModal={openAnswerModal}
            markQuestionAsHelpful={markQuestionAsHelpful}
            toggleExpand={() => toggleExpand(question)}
            reportedAnswers={reportedAnswers}
          />
        ))}
      </div>
    </div>
  );
}

export default QuestionsList;
