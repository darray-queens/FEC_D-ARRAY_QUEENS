import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const { useState } = React;

const StyleSelect = styled.select`
  padding-left: 12px;
  padding-right: 10px;
  margin-right: 20px;
  font-family: inherit;
  font-weight: bold;
  background-color: white;
  border-radius: 0%;
  border-width: 2px;
  height: 55px;
  width: 150px;
  &:hover {
    background-color: rgb(220,220,220);
  }
  &:focus {
    border-radius: 0%;
    border-width: 2px;
  }
`;

const StyleOption = styled.option`
  padding: 10px;
  margin-top: 60px;
  margin-bottom: 20px;
  margin-right: 20px;
  font-family: inherit;
  font-weight: bold;
  background-color: white;
  border-radius: 0%;
  border-width: 2px;
  height: 60px;
  width: 150px;
`;

function Selection({ style, sku, changeSku }) {
  const skuTuples = Object.entries(style.skus);

  const [currentQty, setCurrentQty] = useState();
  const [hideLabel, setHideLabel] = useState(true);

  const addToCartHandler = () => {
    if (!sku) {
      setHideLabel(false);
      document.getElementById('size-select').focus();
    } else {
      let count = currentQty;
      while (count > 0) {
        axios.post('/cart', { sku_id: sku })
          .catch((error) => console.error(error));
        count -= 1;
      }
    }
  };

  const skuSizeOptions = skuTuples.map((skuTuple) => {
    const code = skuTuple[0];
    const { size, quantity } = skuTuple[1];
    if (quantity > 0) {
      return (
        <StyleOption key={code} data-sku={code} id={size}>{size}</StyleOption>
      );
    }

    return '';
  });

  let sizeOptions = (
    <>
      <StyleOption style={{ display: 'none' }}>SELECT SIZE</StyleOption>
      {skuSizeOptions}
    </>
  );

  let hideCart = false;

  if (skuSizeOptions.length === 0) {
    sizeOptions = <StyleOption style={{ display: 'none' }}>OUT OF STOCK</StyleOption>;
    hideCart = true;
  }

  const buildQuantityList = (qty) => {
    const list = [];
    const max = qty > 15 ? 15 : qty;
    for (let i = 1; i <= max; i += 1) {
      list.push(<option key={i}>{i}</option>);
    }
    return list;
  };

  const quantity = sku ? style.skus[sku].quantity : 0;
  const quantityOptions = sku ? buildQuantityList(quantity) : <option>{}</option>;

  return (
    <div>
      <h5 style={hideLabel ? { display: 'none' } : { display: 'inherit' }}>Please select a size</h5>
      <StyleSelect
        name="size"
        id="size-select"
        onChange={(e) => {
          changeSku(document.getElementById(e.target.value).dataset.sku);
          setHideLabel(true);
        }}
      >
        {sizeOptions}
      </StyleSelect>
      <select disabled={!sku} name="quantity" onChange={(e) => setCurrentQty(e.target.value)}>
        <option style={{ display: 'none' }}>{}</option>
        {quantityOptions}
      </select>
      <button
        name="add"
        type="button"
        style={hideCart ? { display: 'none' } : { display: 'inherit' }}
        onClick={() => addToCartHandler()}
      >
        Add to Bag
      </button>
    </div>
  );
}

export default Selection;
