const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('order', {
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    completionDate:{
        type: DataTypes.DATE,
        allowNull: true
    },

    status:{
        type: DataTypes.ENUM({
            values: ['cart', 'created', 'processing', 'cancelled', 'completed']
        })         
    },

    rating:{
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true
    },

    review:{
      type: DataTypes.TEXT,
      allowNull: true
    }
  });
};