import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Row } from '../shared/containers';

const { useState } = React;

const StyleSelect = styled.select`
  appearance: none;
  display: block;
  padding-left: 20px;
  padding-right: 10px;
  margin-right: 15px;
  margin-top: 12px;
  font-family: inherit;
  font-weight: bold;
  background-color: white;
  border-radius: 0%;
  border-width: 2px;
  height: 55px;
  width: 150px;
  &:hover {
    background-color: rgb(220,220,220);
    cursor: pointer;
  }
  &:focus {
    border-radius: 0%;
    border-width: 2px;
    outline: 0;
  }
`;

const QuantSelect = styled(StyleSelect)`
  padding-left: 20px;
  margin-right: 20px;
  width: 55px;
`;

const SelectOption = styled.option`
  text-align: left;
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

const CartButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  font-weight: bold;
  font-family: inherit;
  background-color: white;
  height: 55px;
  width: 220px;
  line-height: 50px;
  &:hover {
    background-color: rgb(220,220,220);
    cursor: pointer;
  }
  &:focus {
    border-radius: 0%;
    border-width: 2px;
    outline: 0;
  }
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
        <SelectOption key={code} data-sku={code} id={size}>{size}</SelectOption>
      );
    }

    return '';
  });

  let sizeOptions = (
    <>
      <SelectOption style={{ display: 'none' }}>SELECT SIZE &#129139;</SelectOption>
      {skuSizeOptions}
    </>
  );

  let hideCart = false;

  if (skuSizeOptions.length === 0) {
    sizeOptions = <SelectOption style={{ display: 'none' }}>OUT OF STOCK</SelectOption>;
    hideCart = true;
  }

  const buildQuantityList = (qty) => {
    const list = [];
    const max = qty > 15 ? 15 : qty;
    for (let i = 1; i <= max; i += 1) {
      list.push(<SelectOption key={i}>{i}</SelectOption>);
    }
    return list;
  };

  const quantity = sku ? style.skus[sku].quantity : 0;
  const quantityOptions = sku ? buildQuantityList(quantity) : <SelectOption>{}</SelectOption>;

  return (
    <div>
      <h5 style={hideLabel ? { display: 'none' } : { display: 'inherit' }}>Please select a size</h5>
      <Row>
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
        <QuantSelect disabled={!sku} name="quantity" onChange={(e) => setCurrentQty(e.target.value)}>
          <SelectOption style={{ display: 'none' }}>&#129139;</SelectOption>
          {quantityOptions}
        </QuantSelect>
        <CartButton
          name="add"
          type="button"
          style={hideCart ? { display: 'none' } : { display: 'inherit' }}
          onClick={() => addToCartHandler()}
        >
          ADD TO BAG
        </CartButton>
      </Row>
    </div>
  );
}

export default Selection;
