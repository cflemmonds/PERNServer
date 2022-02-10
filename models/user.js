const { DataTypes } = require("sequelize");
const db = require("../db");

const User = db.define("user", {
    firstName: {
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = User;