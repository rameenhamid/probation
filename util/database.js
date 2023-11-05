const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('linkedin', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

// Test the database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

module.exports = {
  sequelize, // Export the sequelize instance
};
