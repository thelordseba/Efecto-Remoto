const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('location', {
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    city: {
      type: DataTypes.STRING,
      allowNull: false, 
    },

    postalCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};