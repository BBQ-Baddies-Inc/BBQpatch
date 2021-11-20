import axios from 'axios';
export const BASE = "http://localhost:5000/api/products"; //we will have to adjust to heroku......fitnesstrackerfront

export async function getProducts() {
  try {
    console.log("hello")
    const {data} = await axios.get(`${BASE}`);
            console.log(data)
    return data.products;
  } catch (err) {
    console.log(err);
  }
}

