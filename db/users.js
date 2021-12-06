const { client } = require("./client");

async function createUser({
  first_name,
  last_name,
  email,
  address,
  username,
  password,
  admin,
}) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users(first_name, last_name, email, address, username, password, admin)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;`,
      [first_name, last_name, email, address, username, password, admin]
    );

    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser({ username, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT * FROM users
        WHERE username = $1;
        `,
      [username]
    );
    
    if (user.password !== password) {
      return;
    }

    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    
    const { rows: user } = await client.query(`
        SELECT id, username, first_name, last_name, email, address, admin FROM users
        
        `);
    
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            SELECT id, username FROM users
            WHERE username = $1;
            `,
      [username]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserById(id) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT * FROM users
        WHERE id = $1;
        `,
      [id]
    );

    return user;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
  getAllUsers,
};
