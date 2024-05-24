const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('myapp', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;