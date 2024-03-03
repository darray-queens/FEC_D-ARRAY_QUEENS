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
          return (
            <li key={featureKey}>
              {details.feature}
              -
              {details.value}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ProductDescription;
