import axios from 'axios';
export const BASE = "http://localhost:5000/api/cart"

export async function getCart(productId, userId, quantity){
    const {data} = await axios.get(`${BASE}/`);
    console.log(data)
return data.cart;
}
