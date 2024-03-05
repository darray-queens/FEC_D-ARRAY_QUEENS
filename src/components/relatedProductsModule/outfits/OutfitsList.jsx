import React, { useState } from 'react';
import ProductCard from '../shared/ProductCard';
import { Grid, ProductModuleRow } from '../../shared/containers';

function OutfitsList({ currentProduct }) {
  const [outfitList, setOutfitList] = useState([{}]);

  if (Object.keys(currentProduct).length === 0) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  const addToOutfitList = (id) => {
    if (Object.keys(outfitList[0]).length === 0) {
      setOutfitList([currentProduct]);
    } else {
      const listOfIds = [];
      outfitList.forEach((element) => {
        listOfIds.push(element.id);
      });
      if (!listOfIds.includes(id)) {
        setOutfitList((prevList) => [...prevList, currentProduct]);
      }
    }
  };

  const removeFromOutfitList = (id) => {
    const newOutfitList = [];

    if (outfitList.length === 1) {
      newOutfitList.push({});
    } else {
      outfitList.forEach((element) => {
        if (element.id !== id) {
          newOutfitList.push(element);
        }
      });
    }
    setOutfitList(newOutfitList);
  };

  return (
    <Grid>
      <h2>Your Outfit</h2>
      <ProductModuleRow>
        <ProductCard
          key={currentProduct.id}
          product={currentProduct}
          actionButtonClick={addToOutfitList}
          imageClick={() => null}
          textValue="★"
        />
        {Object.keys(outfitList[0]).length === 0 ? <div />
          : outfitList.map((element) => (
            <ProductCard
              key={element.id}
              product={element}
              actionButtonClick={removeFromOutfitList}
              imageClick={() => null}
              textValue="ⓧ"
            />
          ))}
      </ProductModuleRow>
    </Grid>

  );
}
export default OutfitsList;
