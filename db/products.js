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

async function getProductById(id) {
  try {
    const { rows } = await client.query(`
    SELECT * FROM products
    WHERE "id" = ${id};`);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function updateProduct({
  name,
  price,
  category,
  photo,
  description,
  stock_data,
  id
}) {
  try {
    const {
      rows: [updatedProduct],
    } = await client.query(
      `
    UPDATE products (name, price, category, photo, description, stock_data)
    SET name = $1, price = $2, category = $3, photo = $4, description = $5, stock_data = $6
    WHERE "id" = ${id}
    RETURNING *;
    `,
      [name, price, category, photo, description, stock_data]
    );
    return updatedProduct;
  } catch (error) {
    throw error;
  }
}

async function removeProduct(id) {
  try {
    const {
      rows: [removedProduct],
    } = await client.query(`
    DELETE FROM products
    WHERE "id" = ${id}
    RETURNING *;
    `);
    return removedProduct;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  removeProduct,
  getProductById
};
