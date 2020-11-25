const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

sequelize.define('location', {
    //en name tengo que hacer una función por firstname y lastname= por 
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    number: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    postalCode: {
        type: DataTypes.STRING,
        allowNull: true,
    }, 

    city: {
        type: DataTypes.STRING,
        allowNull: true
    },

    province: {
        type: DataTypes.STRING,
        allowNull: true
    }, 
})}