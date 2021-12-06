const { client } = require("./client");

async function addToCart({ productId, userId, quantity }) {
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
      const { rows } = await client.query(
        `
INSERT INTO cart ("userId") 
VALUES ($1)
RETURNING *;
`,
        [userId]
      );
      currentCart = rows[0];
    }
    const { rows: product } = await client.query(
      `
        INSERT INTO cart_item("productId", "cartId", quantity)
        VALUES ($1, $2, $3)
        RETURNING *;
        `,
      [productId, currentCart.id, quantity]
    );

    return product;
  } catch (error) {
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

    const { rows } = await client.query(
      `
          SELECT * FROM cart_item
          JOIN products on cart_item."productId" = products.id
          WHERE "cartId" = $1`,
      [currentCart.id]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

//quantity update

//remove item
async function destroyCartItem(productId, currentCart) {
  try {
    const {
      rows: [deletedCart],
    } = await client.query(
      `DELETE 
        FROM cart_item
        WHERE "productId"=$1 AND "cartId" =$2
        RETURNING *;`,
      [productId, currentCart]
    );

    return deletedCart;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addToCart,
  getCart,
  destroyCartItem,
};
