import React, { useState, useEffect } from 'react';
import ProductCard from '../shared/Card';
import { Grid, ProductModuleRow } from '../../shared/containers';

function OutfitsList({ currentProduct }) { // import prop of outfitlist
  const [isLoading, setIsLoading] = useState(true);

  if (Object.keys(currentProduct).length === 0) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <Grid>
      <h2>Your Outfit</h2>
      <ProductModuleRow>
        <ProductCard key={currentProduct.id} product={currentProduct} />
      </ProductModuleRow>
    </Grid>
  );
}
export default OutfitsList;
