const client = require ('./client')

async function dropTables() {
    try {
      console.log('Dropping All Tables...');
      // drop all tables, in the correct order
      await client.query(`
      DROP TABLE IF EXISTS routineActivities;
      DROP TABLE IF EXISTS routines;
      DROP TABLE IF EXISTS activities;
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
  password VARCHAR(255) NOT NULL
      );
  
      CREATE TABLE activities(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL
      );
  
      CREATE TABLE routines(
  id SERIAL PRIMARY KEY,
  "creatorId" INTEGER REFERENCES users(id),
  "isPublic" BOOLEAN DEFAULT false,
  name VARCHAR(255) UNIQUE NOT NULL,
  goal TEXT NOT NULL
      );
  
      CREATE TABLE routineActivities(
  id SERIAL PRIMARY KEY,
  "routineId" INTEGER REFERENCES routines(id),
  "activityId" INTEGER REFERENCES activities(id),
  duration INTEGER,
  count INTEGER,
  UNIQUE ("routineId", "activityId")
  
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
  
      const usersToCreate = [
        { username: 'luke', password: 'luke99' },
        { username: 'eric', password: 'eric123' },
        { username: 'brian', password: 'brian123' },
      ]
      const users = await Promise.all(usersToCreate.map(createUser));
  
      console.log('Users created:');
      console.log(users);
      console.log('Finished creating users!');
    } catch (error) {
      console.error('Error creating users!');
      throw error;
    }
  }