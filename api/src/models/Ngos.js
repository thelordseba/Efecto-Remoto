const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('ngo', {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    url: {
      type: DataTypes.TEXT,
      allowNull: true, 
      validate: {
        isUrl: true,
      },
    },

    // accessToken: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // }
  });
};
