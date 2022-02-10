const {Sequelize} = require('sequelize');

const db = new Sequelize("postgres://postgres:cosmiclocal@localhost:5432/firelogger")

module.exports = db;