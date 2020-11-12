//modelo de orden de línea
//sacado de los otros modelos

const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
	sequelize.define('orderLine', {


//price

		price: {
			type: DataTypes.FLOAT,
			allowNull: false,
			validate: {
                isNumeric: true
            }
		},


//quantity

		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isNumeric: true
			}
		}

});
};