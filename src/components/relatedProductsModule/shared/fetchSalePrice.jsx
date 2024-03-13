import axios from 'axios';

const fetchSalePrice = async (id) => {
  const stylesData = await axios.get(`/products/${id}/styles`)
    .catch((err) => {
      console.error(err);
    });

    console.log(stylesData, 'stylesData in fetch before promisesResolved')
  return stylesData.data.results[0].sale_price;
};

export default fetchSalePrice;
