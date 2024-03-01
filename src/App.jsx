import React from 'react';
import Overview from './components/overview/Overview';
import RelatedProductsList from './components/relatedProducts/RelatedProductsList';
import OutfitsList from './components/outfits/OutfitsList';
import GetAllQuestions from './components/questionsAndAnswers/GetAllQuestions';
import ReviewList from './components/review/ReviewList';

const { useState } = React;

function App() {
  const [currentProduct, setCurrentProduct] = useState(null);

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
