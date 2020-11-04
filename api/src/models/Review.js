const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('reviews', {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    description:{
        type: DataTypes.TEXT,
        allowNull: false        
    }
  });
};