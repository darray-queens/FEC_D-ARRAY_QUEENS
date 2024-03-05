import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Card from '../shared/Card';

function OutfitsList() { // import prop of outfitlist
  const [productsList, setProductsList] = useState([]);

  // useeffect to pass in outfits list

  // useEffect(() => {
  //   axios.get('/products') // change this to 'your outfits' endpoint
  //     .then((response) => {
  //       setProductsList(response.data);
  //     });
  // }, []);

  if (productsList.length === 0) {
    return (
      <div>
        <h2>Your Outfit</h2>
        Add Your Outfit Pieces!
      </div>
    );
  }

  return (
    <div>
      <h2>Your Outfit</h2>
      {productsList.map((element) => <Card product={element} />)}
    </div>
  );
}
export default OutfitsList;
