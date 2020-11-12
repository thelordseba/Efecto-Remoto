import { DataTypes } from 'sequelize';
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

export default (sequelize) => {
  // defino el modelo

  sequelize.define('image', {

    img: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

  });
};
