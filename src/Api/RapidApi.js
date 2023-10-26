import axios from "axios";

const options = {
  method: "GET",
  url: "https://amazon-product-price-data.p.rapidapi.com/product",
  params: {
    asins: "B005YQZ1KE,B074R8RQQ2",
    locale: "IN",
  },
  headers: {
    "X-RapidAPI-Key": "242f504e0amsh6d663aadfaccc87p1105d5jsnea297bd352da",
    "X-RapidAPI-Host": "amazon-product-price-data.p.rapidapi.com",
  },
};

// try {
//   const response = await axios.request(options);
//   console.log(response.data);
// } catch (error) {
//   console.error(error);
// }
