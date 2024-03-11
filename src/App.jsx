import axios from 'axios';
import './global.css';
import React from 'react';
import startFakeTimer from './components/bannerComps/startFakeCountdown';

import Overview from './components/overview/Overview';
import GalleryModal from './components/overview/GalleryModal';
import GetAllQuestionsAndAnswers from './components/questionsAndAnswers/GetAllQuestionsAndAnswers';
import ReviewList from './components/review/ReviewList';
import RelatedProductsContainer from './components/relatedProductsModule/Container';

const { useState, useEffect } = React;

function App() {
  const [currentProduct, setCurrentProduct] = useState({});
  const [productId, setProductId] = useState('40344');

  const [currentStyle, setCurrentStyle] = useState({});
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [minThumbIndex, setMinThumbIndex] = useState(0);
  const [maxThumbIndex, setMaxThumbIndex] = useState();
  const [galleryModal, setGalleryModal] = useState(false);
  const [countdown, setCountdown] = useState('Loading countdown...');

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`products/${productId}`)
      .then((response) => {
        setCurrentProduct(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [productId]);

  // useEffect(() => {
  //   // Duration for the countdown in seconds (e.g., 4 hours = 14400 seconds)
  //   const duration = 4 * 60 * 60; // Modify this value as needed
  //   // Start the fake timer
  //   startFakeTimer(duration, setCountdown);
  // }, []);

  useEffect(() => {
    // Example: Dynamically calculate and set padding
    const logoBannerHeight = document.querySelector('.logo-banner')?.offsetHeight || 0;
    const fixedBannerHeight = document.querySelector('.fixed-banner')?.offsetHeight || 0;
    const totalBannerHeight = logoBannerHeight + fixedBannerHeight;

    const bodyContentElement = document.querySelector('.body-content');
    if (bodyContentElement) {
      bodyContentElement.style.paddingTop = `${totalBannerHeight}px`;
    }
  }, []);
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
      <div>
        <div className="logo-banner" style={{ zIndex: 2147483640 }}>Real Queen Shit</div>
        <div className="fixed-banner" style={{ zIndex: 2147483640 }}>{countdown}</div>
        <div className="body-content">
          <Overview
            currentProduct={currentProduct}
            currentStyle={currentStyle}
            changeCurrentStyle={(newStyle) => setCurrentStyle(newStyle)}
            reviewCount={reviews.length}
            mainImageIndex={mainImageIndex}
            changeMainImageIndex={setMainImageIndex}
            minThumbIndex={minThumbIndex}
            changeMinThumbIndex={(newIndex) => setMinThumbIndex(newIndex)}
            maxThumbIndex={maxThumbIndex}
            changeMaxThumbIndex={(newIndex) => setMaxThumbIndex(newIndex)}
            galleryModal={galleryModal}
            toggleGalleryModal={(bool) => setGalleryModal(bool)}
          />
          {/* <RelatedProductsContainer currentProduct={currentProduct} setProductId={setProductId} />
          <GetAllQuestionsAndAnswers currentProduct={currentProduct} />
          <ReviewList
            currentProduct={currentProduct}
            reviews={reviews}
            updateReviews={(newReviews) => setReviews(newReviews)}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
{/* <Overview
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
<ReviewList currentProduct={currentProduct} /> */}
