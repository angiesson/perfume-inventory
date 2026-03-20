# Perfume Product API

This project is a simple REST API for managing perfume products, connected to a PostgreSQL database.

## Description

The application allows you to store, retrieve, update, and delete perfume products.
It is built to demonstrate how a backend system can communicate with a database using a RESTful API.

Each product contains information such as name, brand, price, and description.

## Technologies Used

- REST API
- PostgreSQL
- JavaScript (Node.js)
- Express.js
- JSON

## Features

* Create new perfume products
* Get all products
* Get a single product by ID
* Update existing products
* Delete products

## Database

The project uses PostgreSQL to store product data.
The database is connected to the API, allowing persistent storage and retrieval of information.

## How to Run the Project

1. Clone the repository:

   ```bash
   git clone https://github.com/angiesson/perfume-inventory.git
   ```

2. Set up your PostgreSQL database

   * Create a database
   * Update your database connection settings

3. Run the application

4. Use a tool like Postman or your browser to test the API endpoints

## Example Endpoints

* GET /products → Get all products
* GET /products/{id} → Get product by ID
* POST /products → Create new product
* PUT /products/{id} → Update product
* DELETE /products/{id} → Delete product

## Purpose

The purpose of this project is to practice building a REST API and working with databases, as well as understanding how backend systems are structured.

## Future Improvements

* Add authentication (login system)
* Improve validation
* Add a frontend interface
* Deploy the project online

---
