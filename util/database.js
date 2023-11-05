const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('linkedin', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});


