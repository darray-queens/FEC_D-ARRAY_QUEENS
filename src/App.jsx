import axios from 'axios';

import React from 'react';
import Overview from './components/overview/Overview';
import RelatedProductsList from './components/relatedProductsModule/relatedProducts/RelatedProductsList';
import OutfitsList from './components/relatedProductsModule/outfits/OutfitsList';
import GetAllQuestionsAndAnswers from './components/questionsAndAnswers/GetAllQuestionsAndAnswers';
import ReviewList from './components/review/ReviewList';

const { useState, useEffect } = React;

function App() {
  const [currentProduct, setCurrentProduct] = useState({});
  const [productId, setProductId] = useState('40344');

  useEffect(() => {
    axios.get(`products/${productId}`)
      .then((response) => {
        setCurrentProduct(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [productId]);

  return (
    <div>
      <h2>Howdy, world!!</h2>
      <Overview currentProduct={currentProduct} />
      <RelatedProductsList currentProduct={currentProduct} setProductId={setProductId} />
      <OutfitsList currentProduct={currentProduct} />
      <GetAllQuestionsAndAnswers currentProduct={currentProduct} />
      <ReviewList currentProduct={currentProduct} />
    </div>
  );
}

export default App;
