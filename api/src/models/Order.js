const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('order', {
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    completionDate:{
        type: DataTypes.DATE,
        allowNull: false        
    },

    status:{
        type: DataTypes.ENUM({
            values: ['cart', 'created', 'processing', 'cancelled', 'completed']
        })         
    }
  });
};