const {client} = require ('./client')
const userData = require ('./USERS.json')

const {
  createUser,
} = require('./')

async function dropTables() {
    try {
      console.log('Dropping All Tables...');
      // drop all tables, in the correct order
      await client.query(`
   
      DROP TABLE IF EXISTS users;
    `);
  console.log('Finishing dropping tables!')
    } catch (error) {
      console.error('Error while dropping tables');
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
  

      `);
  
    } catch (error) {
      console.error('Error constructing tables');
      throw error
    }
  
  
  }

  async function createInitialUsers() {
    console.log('Starting to create users...');
    try {
  
       
      const users = await Promise.all(userData.map(createUser));
  
      console.log('Users created:');
      console.log(users);
      console.log('Finished creating users!');
    } catch (error) {
      console.error('Error creating users!');
      throw error;
    }
  }

  async function rebuildDB() {
    try {
      client.connect();
      await dropTables();
      await createTables();
      await createInitialUsers();
    } catch (error) {
      console.log("Error during rebuildDB");
      throw error;
    }
  }
  
  module.exports = {
  
    rebuildDB,
  }