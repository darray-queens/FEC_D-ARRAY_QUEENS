import axios from 'axios';

import React from 'react';
import Overview from './components/overview/Overview';
import GetAllQuestionsAndAnswers from './components/questionsAndAnswers/GetAllQuestionsAndAnswers';
import ReviewList from './components/review/ReviewList';
import RelatedProductsContainer from './components/relatedProductsModule/Container';

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
      <RelatedProductsContainer currentProduct={currentProduct} setProductId={setProductId} />
      <GetAllQuestionsAndAnswers currentProduct={currentProduct} />
      <ReviewList currentProduct={currentProduct} />
    </div>
  );
}

export default App;
