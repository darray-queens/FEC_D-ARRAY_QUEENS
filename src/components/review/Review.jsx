import React from 'react';

import axios from 'axios';

const { useState, useEffect } = React;

function Review({ entry }) {
  return (
    <div>
      <p>
        {entry.rating}
        {' '}
        ☆
      </p>
      <p>
        {entry.reviewer_name}
        ,
        {' '}
        {new Date(entry.date).toLocaleDateString()}
      </p>
      <b>{entry.summary}</b>
      <p>{entry.body}</p>
      {entry.photos.map((photo) => (
        <img src={photo.url} alt={photo.id} key={photo.id} />
      ))}
    </div>
  );
}

export default Review;
