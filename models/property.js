const { DataTypes } = require("sequelize");
const db = require("../db");

const Property = db.define("property", {
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    serial: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imgURL: {
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    value: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ownerID: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
})

module.exports = Property