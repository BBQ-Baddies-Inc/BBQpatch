const { client } = require("./client");


async function addToCart({ productId, userId, quantity }) {
    console.log(quantity)
  try {
   let {
      rows: [currentCart],
    } = await client.query(
      `
        SELECT * FROM cart
        WHERE "userId" = $1
        AND "paidFor" = false
    `,
      [userId]
    );
    if (!currentCart) {
      const { rows } = await client.query(`
INSERT INTO cart ("userId") 
VALUES ($1)
RETURNING *;
`,[userId]);
currentCart = rows[0]
    }
    const {rows: product } = await client.query(
      `
        INSERT INTO cart_item("productId", "cartId", quantity)
        VALUES ($1, $2, $3)
        RETURNING *;
        `,
      [productId, currentCart.id, quantity]
    );

    console.log(product);
    return product;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

async function getCart(id) {
  try {
    console.log("Cart", id);
    const {
      rows: [currentCart],
    } = await client.query(
      `
              SELECT * FROM cart
              WHERE "userId" = $1
          `,
      [id]
    );
    console.log(currentCart, "currentcart")
    const { rows } = await client.query(
      `
          SELECT * FROM cart_item
          JOIN products on cart_item."productId" = products.id
          WHERE "cartId" = $1`,
      [currentCart.id]
    );
    console.log(rows, "hopefully cart");
    return rows;
  } catch (error) {
    throw error;
  }
}

//quantity update

//remove item

module.exports = {
  addToCart,
  getCart,
};
