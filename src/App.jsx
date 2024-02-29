import React from 'react';

const { useState } = React;

function App() {
  const [currentProduct, setCurrentProduct] = useState(null);

  return <div>Howdy, world!!</div>;
}

export default App;
