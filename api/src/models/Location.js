const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

sequelize.define('location', {
    //en name tengo que hacer una función por firstname y lastname= por 
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    number: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    postalCode: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 

    city: {
        type: DataTypes.STRING,
        allowNull: false
    },

    province: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
})}