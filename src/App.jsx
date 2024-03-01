import axios from 'axios';

import React from 'react';
import Overview from './components/overview/Overview';
import RelatedProductsList from './components/relatedProducts/RelatedProductsList';
import OutfitsList from './components/outfits/OutfitsList';
import GetAllQuestions from './components/questionsAndAnswers/GetAllQuestions';
import ReviewList from './components/review/ReviewList';

const { useState, useEffect } = React;

function App() {
  const [currentProduct, setCurrentProduct] = useState(null);

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
      <Overview />
      <RelatedProductsList />
      <OutfitsList />
      <GetAllQuestions />
      <ReviewList />
    </div>
  );
}

export default App;
