import axios from 'axios';
import { getToken } from '../auth';
export const BASE = "http://localhost:5000/api/cart"


export async function addToCart(productId, userId, quantity){
    const {data} = await axios.post(`${BASE}/`,{productId, userId, quantity});

    console.log(data)
return data.cart;
}

export async function getCart(){
    const token = getToken();
    try {

        const {data} = await axios.get(`${BASE}/`, {
            headers: {Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"}
          });
          return data.cart;
    } catch (error) {
        console.log(error)
    }
}
