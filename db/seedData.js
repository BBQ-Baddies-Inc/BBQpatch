const { client } = require("./client");
const userData = require("./USERS.json");
const products = require("./PRODUCTS.json");

const { createUser, createProduct, createCart } = require("./");

async function dropTables() {
  try {
    console.log("Dropping All Tables...");
    // drop all tables, in the correct order
    await client.query(`
      DROP TABLE IF EXISTS cart;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;

      
    `);
    console.log("Finishing dropping tables!");
  } catch (error) {
    console.error("Error while dropping tables");
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Starting to build tables...");
    // create all tables, in the correct order
    await client.query(`
    CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(50),
	last_name VARCHAR(50),
	email VARCHAR(255),
	address VARCHAR(255),
	admin BOOLEAN DEFAULT FALSE,
  password VARCHAR(255) NOT NULL
      );
  CREATE TABLE products(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description text NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_data INTEGER NOT NULL,
  photo text NOT NULL,
  category VARCHAR(255) NOT NULL,
  main_Product_Photo text NOT NULL
      );
  CREATE TABLE cart(
    id SERIAL PRIMARY KEY,
    "userId" INTEGER REFERENCES users(id),
    "paidFor" BOOLEAN DEFAULT FALSE
  );
  CREATE TABLE cart_item(
    id SERIAL PRIMARY KEY,
    quantity INTEGER NOT NULL,
    "productId" INTEGER REFERENCES products(id),
    "cartId" INTEGER REFERENCES cart(id)
  );    


      `);
  } catch (error) {
    console.error("Error constructing tables");
    throw error;
  }
}

async function createInitialUsers() {
  console.log("Starting to create users...");
  try {
    const users = await Promise.all(userData.map(createUser));

    console.log("Users created:");
    console.log(users);
    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function createInitialProducts() {
  console.log("Starting to create products...");
  try {
    const productData = await Promise.all(products.map(createProduct));

    console.log("products created:");
    console.log(productData);
    console.log("Finished creating products!");
  } catch (error) {
    console.error("Error creating products!");
    throw error;
  }
}

async function createInitialCart() {
  console.log("Starting to create cart...");
  try {
    const cartData = await Promise.all(
      [
        { userId: 3, productId: 4, quantity: 3 },
        { userId: 5, productId: 3, quantity: 1 },
        { userId: 4, productId: 2, quantity: 1 },
      ].map(createCart)
    );
    console.log("Cart created:");
    console.log(cartData);
    console.log("Finished creating Cart");
  } catch (error) {
    console.error("error creating Cart");
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialProducts();
    await createInitialCart();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

module.exports = {
  rebuildDB,
};
