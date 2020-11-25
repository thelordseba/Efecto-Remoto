const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('payment', {
    // paymentStatus: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },

    // paymentStatusDetail:{
    //     type: DataTypes.STRING,
    //     allowNull: true,        
    //   },
      
    //   cardExpMonth:{
    //     type: DataTypes.STRING,         
    //     allowNull: true,        
    // },

    // cardExpYear:{
    //     type: DataTypes.STRING,
    //     allowNull: true,        
    // },

    // lastFourDigits:{
    //     type: DataTypes.STRING,
    //     allowNull: false,
    // }
  });
};