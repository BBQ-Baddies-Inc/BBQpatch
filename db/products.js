const { client } = require("./client");

async function createProduct({ name, price, category, photo, description, stock_data, main_Product_Photo }) {
  try {
    const { rows } = await client.query(
      `
            INSERT INTO products (name, price, category, photo, description, stock_data, main_Product_Photo)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `,
      [name, price, category, photo, description, stock_data, main_Product_Photo]
    );
    return rows[0];
  } catch (error) {
    throw error;
  }
}

async function getAllProducts() {
  try {
    console.log("in all products");
    const { rows } = await client.query(`
            SELECT * FROM products;
        `);
    console.log(rows, "hopefully products");
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createProduct,
  getAllProducts,
};
