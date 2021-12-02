import axios from 'axios';
// import { getToken } from '../auth';
export const BASE = "http://localhost:5000/api/products"; //we will have to adjust to heroku......fitnesstrackerfront


export async function getProducts() {
  try {
    console.log("hello")
    const {data} = await axios.get(`${BASE}/`);
            console.log(data)
    return data.products;
  } catch (err) {
    console.log(err);
  }
}

// export async function addProducts(){
//   const token = getToken();
//   try{
//     const {data} = await axios.post(`${BASE}/products`, {
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