import React from 'react';

function ProductDescription(props) {
  const { description, features } = props;

  let highlights = [];
  if (features) { highlights = features; }

  let featureKey = 0;

  return (
    <div>
      <p>{description}</p>
      <ul>
        {highlights.map((details) => {
          featureKey += 1;
          const text = `${details.feature} - ${details.value}`;
          return (
            <li key={featureKey}>
              {text}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ProductDescription;
