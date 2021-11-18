import axios from 'axios';
export const BASE = "http://localhost:5000/api/products"; //we will have to adjust to heroku......fitnesstrackerfront

export async function getProducts() {
  try {
    const {data} = await axios.get(`${BASE}`, {
        headers: {
            'Content-Type': 'application/json',}
            });
            console.log(data)
    return data;
  } catch (err) {
    console.log(err);
  }
}

