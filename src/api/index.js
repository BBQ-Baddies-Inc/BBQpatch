import axios from 'axios';

export async function getSomething() {
  try {
    const { data } = await axios.get('/api');
    return data;
  } catch (error) {
    throw error;
  }
}

//Users

// export async function LoginUser()
// export async function Register()
// export async function Users()
// export async function EditUser()
// export async function fetchProfile()


// Products

// export async function Catalog()
// export async function ProductInfo()
// export async function addToCart()

//Cart

// export async function getCart()
// export async function updateCart()
// export async function deleteProductInCart()
// export async function getProductById()

//Checkout

// export async function checkout()
// export async function payment();
// export async function confirmPurchase()