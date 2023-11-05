const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('linked', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});


