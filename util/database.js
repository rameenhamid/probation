const Sequelize = require('sequelize');

const sequelize = new Sequelize('linkedin-complete', 'root', '', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
