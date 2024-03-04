import React from 'react';

function Selection() {
  return (
    <div>
      <p id="select-label">Select a size</p>
      <select name="size" aria-labelledby="select-label" />
      <p id="quantity-label">Select a quantity</p>
      <select name="quantity" aria-labelledby="quantity-label" />
      <button name="add" type="button">Add to Bag</button>
    </div>
  );
}

export default Selection;
