const {client} = require ('./client')

async function createUser({ first_name, last_name, email, address, username, password, admin }){

    try{
        const {rows: [user] } = await client.query(`
        INSERT INTO users(first_name, last_name, email, address, username, password, admin)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;`
        , [first_name, last_name, email, address, username, password, admin]);

        delete user.password;        
        return user;
    }catch (error){
        throw error;
    }
}


module.exports = {
    createUser
};