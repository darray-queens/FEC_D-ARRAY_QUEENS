import React from 'react';

import axios from 'axios';

const { useState, useEffect } = React;

function Review({ entry }) {
  return (
    <div>
      <p>
        Rating:
        {entry.rating}
      </p>
    </div>
  );
}

export default Review;
