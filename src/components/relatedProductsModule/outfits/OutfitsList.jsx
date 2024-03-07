import React, { useState, useRef } from 'react';
import ProductCard from '../shared/ProductCard';
import scrollButtonClick from '../shared/scrollButtonClick';
import {
  Grid,
  Col,
  ProductModuleRow,
  StyledButton,
} from '../../shared/containers';

function OutfitsList({ currentProduct }) {
  const currOutfitItems = localStorage.getItem('outfits');
  const parsedCurrOutfitItems = JSON.parse(currOutfitItems);

  const [outfitList, setOutfitList] = useState(() => (
    currOutfitItems === null ? [{}] : parsedCurrOutfitItems));

  const OutfitModuleRef = useRef(null);

  if (Object.keys(currentProduct).length === 0) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  const writeOutfitToLocalStorage = () => {
    const outfits = [];

    if (localStorage.length > 0) {
      parsedCurrOutfitItems.forEach((element) => {
        outfits.push(element);
      });
    }

    outfits.push(currentProduct);
    const outfitsJSON = JSON.stringify(outfits);
    localStorage.setItem('outfits', outfitsJSON);
  };

  const addToOutfitList = (id) => {
    if (Object.keys(outfitList[0]).length === 0) {
      setOutfitList([currentProduct]);
      writeOutfitToLocalStorage();
    } else {
      const listOfIds = [];
      outfitList.forEach((element) => {
        listOfIds.push(element.id);
      });
      if (!listOfIds.includes(id)) {
        setOutfitList((prevList) => [...prevList, currentProduct]);
        writeOutfitToLocalStorage();
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
        <Col size={1}>
          <StyledButton type="button">&nbsp;</StyledButton>
        </Col>
        <ProductCard
          key={currentProduct.id}
          product={currentProduct}
          actionButtonClick={addToOutfitList}
          imageClick={() => null}
          textValue="★"
        />
        <Col size={1}>
          <StyledButton type="button" onClick={() => scrollButtonClick(OutfitModuleRef.current, 'left')}>&lt;</StyledButton>
        </Col>
        <Col size={18}>
          <ProductModuleRow ref={OutfitModuleRef} width={72.5}>
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
        </Col>
        <Col size={1}>
          <StyledButton type="button" onClick={() => scrollButtonClick(OutfitModuleRef.current, 'right')}>&gt;</StyledButton>
        </Col>
      </ProductModuleRow>
    </Grid>

  );
}
export default OutfitsList;
