import React from 'react';
import axios from 'axios';

const { useState } = React;

function Selection({ style, sku, changeSku }) {
  const skuTuples = Object.entries(style.skus);
  const [currentQty, setCurrentQty] = useState();

  const addToCart = async () => {
    let count = currentQty;
    while (count > 0) {
      axios.post('/cart', { sku_id: sku })
        .catch((error) => console.error(error));
      count -= 1;
    }
  };

  const skuSizeOptions = skuTuples.map((skuTuple) => {
    const code = skuTuple[0];
    const { size, quantity } = skuTuple[1];
    if (quantity > 0) {
      return (
        <option key={code} data-sku={code} id={size}>{size}</option>
      );
    }

    return '';
  });

  let sizeOptions = (
    <>
      <option style={{ display: 'none' }}>SELECT SIZE</option>
      {skuSizeOptions}
    </>
  );

  let hideCart = false;

  if (skuSizeOptions.length === 0) {
    sizeOptions = <option style={{ display: 'none' }}>OUT OF STOCK</option>;
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
      <select
        name="size"
        onChange={(e) => changeSku(document.getElementById(e.target.value).dataset.sku)}
      >
        {sizeOptions}
      </select>
      <select disabled={!sku} name="quantity" onChange={(e) => setCurrentQty(e.target.value)}>
        {quantityOptions}
      </select>
      <button
        name="add"
        type="button"
        style={hideCart ? { display: 'none' } : { display: 'inherit' }}
        onClick={() => addToCart()}
      >
        Add to Bag
      </button>
    </div>
  );
}

export default Selection;
