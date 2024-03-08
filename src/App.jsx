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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`products/${productId}`)
      .then((response) => {
        console.log(response.data);
        setCurrentProduct(response.data);
        setIsLoading(false); // Set loading to false after data is fetched
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false); // Set loading to false in case of error
      });
  }, [productId]);

  return (
    <div>
      <h2>Howdy, world!!</h2>
      <Overview currentProduct={currentProduct} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <GetAllQuestionsAndAnswers currentProduct={currentProduct} />
      )}
      <RelatedProductsContainer currentProduct={currentProduct} setProductId={setProductId} />
      <ReviewList currentProduct={currentProduct} />
    </div>
  );
}

export default App;
