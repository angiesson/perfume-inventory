const express = require('express'); // Hämtar express ramverket
const { Pool } = require('pg'); // PostgreSQL klient
require('dotenv').config(); // För att läsa .env filer

const app = express(); // Skapa express app
app.use(express.json()); // För att kunna läsa JSON i request body

// Databas-anslutning (måste stämma med din PostgreSQL setup)
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Exportera pool så routes kan använda den
module.exports = { pool };

// Initiera databas och tabell
const initDatabase = async () => {
  try {
    // Skapa tabell om den inte finns
    await pool.query(` 
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 0,
        price DECIMAL(10, 2) NOT NULL,
        category VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Databasen är igång!');
    
  } catch (error) {
    console.error('Databasfel:', error);
    process.exit(1);
  }
};

// Kör init vid start
initDatabase();

// Importera och använd routes
const productsRouter = require('./routes/products');
app.use('/products', productsRouter);

// Starta servern
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server körs på http://localhost:${PORT}`);
});