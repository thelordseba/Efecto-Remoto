const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo

  sequelize.define('ngo', {

    name: {
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

  });
};
