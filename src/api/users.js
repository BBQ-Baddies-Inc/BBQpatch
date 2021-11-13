export const BASE = "postgres://localhost:5432/bbqbaddies";

export async function registerUser(username, password) {
  try {
    const response = await axios.post(`${BASE}/api/users/register`, {
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
    const response = await axios.post(`${BASE}/api/users/login`, {
      username,
      password,
    });

    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}