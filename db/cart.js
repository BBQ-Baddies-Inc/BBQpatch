const {client} = require ('./client')

async function createCart({productId, userId, quantity}) {
    try {
      
        const {rows} = await client.query(`
        INSERT INTO cart("productId", "userId", "quantity")
        VALUES ($1, $2, $3)
        RETURNING *;
        `,[productId, userId, quantity])


    return rows;
    } catch (error) {
        console.log("error", error)
      throw error  
    }
}

async function getCart() {
    try {
      console.log("Cart");
      const { rows } = await client.query(`
              SELECT * FROM cart;
          `);
      console.log(rows, "hopefully cart");
      return rows;
    } catch (error) {
      throw error;
    }
  }

  module.exports = {
    getCart,
    createCart
  };
  