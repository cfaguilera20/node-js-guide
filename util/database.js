const Sequelize = require('sequelize');

const sequelize = new Sequelize('homestead', 'homestead', 'secret', {
    dialect: 'mysql',
    host: 'guide-database'
});

module.exports = sequelize;