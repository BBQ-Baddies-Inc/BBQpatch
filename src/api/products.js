import axios from 'axios';
import {BASE} from "./cart"
// import { getToken } from '../auth';
const productsBASE = `${BASE}/products`;//we will have to adjust to heroku......fitnesstrackerfront


export async function getProducts() {
  try {
   
    const {data} = await axios.get(`${productsBASE}/`);
            
    return data.products;
  } catch (err) {
    console.log(err);
  }
}

// export async function addProducts(){
//   const token = getToken();
//   try{
//     const {data} = await axios.post(`${productsBASE}/products`, {
//       // name: name,
//       // description: description,
//     },
//     {headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-type": "application/json"
//     }});
//     return data;
//   }catch(error){
//     throw error(error);
//   }
// }