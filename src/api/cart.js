import axios from 'axios';
export const BASE = "http://localhost:5000/api"
// export const BASE = "https://fathomless-sea-11187.herokuapp.com/api"

export async function getCart(){
    const {data} = await axios.get(`${BASE}/cart`);
    console.log(data)
return data.cart;
}
