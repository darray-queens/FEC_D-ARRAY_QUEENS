import axios from 'axios';

import React from 'react';
import Overview from './components/overview/Overview';
import GalleryModal from './components/overview/GalleryModal';
import GetAllQuestionsAndAnswers from './components/questionsAndAnswers/GetAllQuestionsAndAnswers';
import ReviewList from './components/review/ReviewList';
import RelatedProductsContainer from './components/relatedProductsModule/Container';

const { useState, useEffect } = React;

function App() {
  const [currentProduct, setCurrentProduct] = useState({});
  const [productId, setProductId] = useState('40344');
  const [isLoading, setIsLoading] = useState(true);

  const [currentStyle, setCurrentStyle] = useState({});
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [minThumbIndex, setMinThumbIndex] = useState(0);
  const [maxThumbIndex, setMaxThumbIndex] = useState();
  const [galleryModal, setGalleryModal] = useState(false);

  useEffect(() => {
    axios.get(`products/${productId}`)
      .then((response) => {
        console.log("Product data:", response.data);
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
      {galleryModal && (
        <GalleryModal
          styleImages={currentStyle.photos}
          mainImageIndex={mainImageIndex}
          changeMainImageIndex={setMainImageIndex}
          minThumbIndex={minThumbIndex}
          changeMinThumbIndex={(newIndex) => setMinThumbIndex(newIndex)}
          maxThumbIndex={maxThumbIndex}
          changeMaxThumbIndex={(newIndex) => setMaxThumbIndex(newIndex)}
          toggleGalleryModal={(bool) => setGalleryModal(bool)}
        />
      )}
      <h2>Howdy, world!!</h2>
      <Overview
        currentProduct={currentProduct}
        currentStyle={currentStyle}
        changeCurrentStyle={(newStyle) => setCurrentStyle(newStyle)}
        mainImageIndex={mainImageIndex}
        changeMainImageIndex={setMainImageIndex}
        minThumbIndex={minThumbIndex}
        changeMinThumbIndex={(newIndex) => setMinThumbIndex(newIndex)}
        maxThumbIndex={maxThumbIndex}
        changeMaxThumbIndex={(newIndex) => setMaxThumbIndex(newIndex)}
        toggleGalleryModal={(bool) => setGalleryModal(bool)}
      />
      <RelatedProductsContainer currentProduct={currentProduct} setProductId={setProductId} />
      <GetAllQuestionsAndAnswers currentProduct={currentProduct} />
      <ReviewList currentProduct={currentProduct} />
    </div>
  );
}

export default App;
