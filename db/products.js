const client = require ('./client')

async function createProduct({name,price,category,imageUrl,description,quantity}) {
    try {
        const {rows} = await client.query(`
            INSERT INTO products (name, price, category, imageUrl, description, quantity)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `, [name, price, category, imageUrl, description, quantity])
        return rows[0]
    } catch (error) {
        throw error
    }
}

module.exports = {
    createProduct
};