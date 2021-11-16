import axios from 'axios';

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
