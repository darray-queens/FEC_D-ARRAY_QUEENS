import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { StyledButton } from '../shared/containers';

function HelpfulButton({ entry }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (entry !== undefined) {
      setIsLoading(false);
    }
  }, [entry]);

  // declare a button
  // on click, make a put request
  // if vote yes, each click either adds or removes a vote
  // if voted yes, can't vote no also

  const [upvoted, setUpvoted] = useState(false);

  const markAsHelpful = async () => {
    if (upvoted === false) {
      axios.put(`/reviews/${entry.review_id}/helpful`)
        .then(() => {
          setUpvoted(true);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  // const markAsNotHelpful = async (answerId) => {
  //   if (isHelpful === undefined) {

  //   }
  // };
  // 'onClick={() => markAnswerAsHelpful(answerData.id)}'
  return (
    (isLoading
      ? (<div>Loading...</div>)
      : (
        <StyledButton style={{ color: 'grey' }} className="link" type="button" onClick={markAsHelpful}>
          Helpful? Yes (
          {entry.helpfulness}
          )
        </StyledButton>
      ))
  );
}

export default HelpfulButton;
