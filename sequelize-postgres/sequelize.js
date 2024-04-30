const { Sequelize } = require('sequelize');

// Initialize Sequelize with your PostgreSQL database credentials
const sequelize = new Sequelize('todos', 'postgres', '8969', {
  host: 'localhost',
  dialect: 'postgres', // Specify the dialect for PostgreSQL
});

module.exports = sequelize;
