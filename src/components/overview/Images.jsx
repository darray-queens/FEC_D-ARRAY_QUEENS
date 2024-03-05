import React from 'react';

function Images({ styleImages }) {
  return (
    <img alt="Clothing" src={styleImages[0].url} width="300" />
  );
}

export default Images;
