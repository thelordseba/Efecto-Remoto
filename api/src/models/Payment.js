const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('payment', {
    paymentStatus: {
      type: DataTypes.STRING,
      allowNull: false
    },

    paymentStatusDetail:{
        type: DataTypes.STRING,
        allowNull: false        
    },

    cardExpMonth:{
        type: DataTypes.STRING         
    },

    cardExpYear:{
        type: DataTypes.STRING,
        allowNull: false        
    },

    lastFourDigits:{
        type: DataTypes.STRING,
        allowNull: false        
    },

    createAt:{
        type: DataTypes.DATE,
        allowNull: false        
    },

    updateAt:{
        type: DataTypes.DATE,
        allowNull: false        
    }
  });
};