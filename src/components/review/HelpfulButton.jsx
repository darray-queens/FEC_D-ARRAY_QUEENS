import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { StyledButton } from '../shared/containers';

const HoverableButton = styled(StyledButton)`
color: grey;
font-weight: ${(props) => {
    if (props.$upvoted) {
      return 'bold';
    }
    return 'normal';
  }};
text-decoration: underline;
cursor: pointer;
font-family: 'Source Code Pro', monospace;

&:hover {
  font-weight: bold;
  color: grey;
}
`;

function HelpfulButton({ entry }) {
  const [isLoading, setIsLoading] = useState(true);
  const [helpfulnessValue, setHelpfulnessValue] = useState(entry ? entry.helpfulness : undefined);
  const [upvoted, setUpvoted] = useState(false);

  useEffect(() => {
    if (entry !== undefined) {
      setIsLoading(false);
    }
  }, [entry]);

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
    setHelpfulnessValue(helpfulnessValue + 1);
  };

  return (
    (isLoading
      ? (<div>Loading...</div>)
      : (
        <HoverableButton type="button" $upvoted={upvoted} onClick={markAsHelpful}>
          Helpful? Yes (
          {helpfulnessValue}
          )
        </HoverableButton>
      )
    ));
}

export default HelpfulButton;
