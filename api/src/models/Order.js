const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('order', {
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    completionDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    transactionAmount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM({
          values: ['cart', 'created', 'processing', 'cancelled', 'completed']
      })         
    },

    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: true,
    },

    review: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    paymentStatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    paymentStatusDetail: {
      type: DataTypes.STRING,
      allowNull: true,        
    },
    
    cardExpMonth: {
      type: DataTypes.STRING,         
      allowNull: true,        
    },

    cardExpYear: {
      type: DataTypes.STRING,
      allowNull: true,        
    },

    lastFourDigits: {
      type: DataTypes.STRING,
      allowNull: true,
    }, 

    recurringPayment: {
      type: DataTypes.STRING,
      allowNull: true, 
    }, 

    paymentMethodId: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    paymentTypeId: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    initPoint: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};