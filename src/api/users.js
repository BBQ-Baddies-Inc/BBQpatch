import axios from 'axios';
import { getToken } from '../auth';

export const BASE = "http://localhost:5000/api/users"; //we will have to adjust to heroku......fitnesstrackerfront

export async function registerUser(username, password) {
  try {
    const {data} = await axios.post(`${BASE}/register`, {
      username,
      password,
    });
    console.log(data)
    return data;
  } catch (error) {
    throw error;
  }
}

// LOGIN USER

export async function loginUser(username, password) {
  try {
    const response = await axios.post(`${BASE}/login`, {
      username,
      password,
    });

    console.log(response, "RESPONSE")
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function getAllUsers(){
  const token = getToken();

try{
  const {data} = await axios.get(`${BASE}/allusers`, {
    headers: {Authorization: `Bearer ${token}`,
  "Content-Type": "application/json"}
  });
  return data
}catch(error){
  throw error;
}

}