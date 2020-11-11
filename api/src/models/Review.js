import { DataTypes } from 'sequelize';

export default (sequelize) => {

  sequelize.define('review', {
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