import { DataTypes } from 'sequelize';

export default (sequelize) => {

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
    }
  });
};