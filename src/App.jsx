import axios from 'axios';

import React from 'react';
import Overview from './components/overview/Overview';
import RelatedProductsList from './components/relatedProductsModule/relatedProducts/RelatedProductsList';
import OutfitsList from './components/relatedProductsModule/outfits/OutfitsList';
import GetAllQuestions from './components/questionsAndAnswers/GetAllQuestions';
import ReviewList from './components/review/ReviewList';

const { useState, useEffect } = React;

function App() {
  const [currentProduct, setCurrentProduct] = useState({});

  useEffect(() => {
    axios.get('products/40344')
      .then((response) => {
        setCurrentProduct(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h2>Howdy, world!!</h2>
      <Overview currentProduct={currentProduct} />
      <RelatedProductsList currentProduct={currentProduct} setCurrentProduct={setCurrentProduct} />
      <OutfitsList currentProduct={currentProduct} />
      <GetAllQuestions currentProduct={currentProduct} />
      <ReviewList currentProduct={currentProduct} />
    </div>
  );
}

export default App;
