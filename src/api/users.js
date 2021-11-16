import axios from 'axios';

export const BASE = "api/users";

export async function registerUser(username, password) {
  try {
    const response = await axios.post(`${BASE}/register`, {
      username,
      password,
    });

    return response.data;
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
