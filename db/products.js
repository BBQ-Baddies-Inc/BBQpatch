const { client } = require("./client");

async function createProduct({ name, price, category, photo, description, stock_data }) {
  try {
    const { rows } = await client.query(
      `
            INSERT INTO products (name, price, category, photo, description, stock_data)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `,
      [name, price, category, photo, description, stock_data]
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

//create get product by Id

module.exports = {
  createProduct,
  getAllProducts,
};
