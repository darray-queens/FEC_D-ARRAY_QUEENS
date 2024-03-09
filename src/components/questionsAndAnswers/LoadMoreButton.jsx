import React from 'react';

function LoadMoreButton({ onClick, text }) {
  return <button type="button" className="question-button" onClick={onClick}>{text}</button>;
}

export default LoadMoreButton;
