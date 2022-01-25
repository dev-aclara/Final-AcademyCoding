const sequelize = require('sequelize');

const connect = new sequelize('divulgabreeder', 'root', '',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connect;