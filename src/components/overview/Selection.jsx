import React from 'react';

const { useState } = React;

const buildQuantityList = (qty) => {
  const list = [];
  const max = qty > 15 ? 15 : qty;
  for (let i = 1; i <= max; i += 1) {
    list.push(<option key={i}>{i}</option>);
  }
  return list;
};

function Selection({ style }) {
  const [currentSku, setCurrentSku] = useState();

  const skus = Object.entries(style.skus);

  const skuSizeOptions = skus.map((sku) => {
    const code = sku[0];
    const { size, quantity } = sku[1];
    if (quantity > 0) {
      return (
        <option key={code} data-sku={code} id={size}>{size}</option>
      );
    }

    return '';
  });

  let sizeOptions = (
    <>
      <option value="disabled selected hidden">SELECT SIZE</option>
      {skuSizeOptions}
    </>
  );

  if (skuSizeOptions.length === 0) {
    sizeOptions = <option value="disabled selected hidden">OUT OF STOCK</option>;
  }

  const { quantity } = currentSku ? style.skus[currentSku] : 0;
  const quantityOptions = currentSku ? buildQuantityList(quantity) : <option>{}</option>;

  return (
    <div>
      <select
        name="size"
        onChange={(e) => {
          const { sku } = document.getElementById(e.target.value).dataset;
          console.log(sku);
          setCurrentSku(sku);
        }}
      >
        {sizeOptions}
      </select>
      <p id="quantity-label">Select a quantity</p>
      <select name="quantity" aria-labelledby="quantity-label">
        {quantityOptions}
      </select>
      <button name="add" type="button">Add to Bag</button>
    </div>
  );
}

export default Selection;
