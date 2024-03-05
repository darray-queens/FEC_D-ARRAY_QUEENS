import React, { useState, useEffect } from 'react';
import ProductCard from '../shared/ProductCard';
import { Grid, ProductModuleRow } from '../../shared/containers';

function OutfitsList({ currentProduct }) { // import prop of outfitlist
  const [outfitList, setOutfitList] = useState(null)

  if (Object.keys(currentProduct).length === 0) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  const actionButtonClick = (id) => {
    console.log('outfit actionbtn click', id);



  };

  return (
    <Grid>
      <h2>Your Outfit</h2>
      <ProductModuleRow>
        <ProductCard
          key={currentProduct.id}
          product={currentProduct}
          actionButtonClick={actionButtonClick}
          imageClick={() => null}
        />
        { }
      </ProductModuleRow>
    </Grid>
  );
}
export default OutfitsList;
