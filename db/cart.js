const {client} = require ('./client')

async function addToCart({productId, userId, quantity}) {
    try {
      
        const {rows} = await client.query(`
        INSERT INTO cart-item("productId", "userId", "quantity")
        VALUES ($1, $2, $3)
        RETURNING *;
        `,[productId, userId, quantity])


    return rows;
    } catch (error) {
        console.log("error", error)
      throw error  
    }
}

async function getCart(id) {
    try {
      console.log("Cart");
      const { rows } = await client.query(`
              SELECT * FROM cart
              WHERE userId = $1
          `, [id]);
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
  