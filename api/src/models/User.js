//exportar 
//definir el modelo de Usuario

//copio y pego lo de product.js de prueba
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
//defino el modelo como en product

sequelize.define('user', {
    //en name tengo que hacer una función por firstname y lastname= por 
    //
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    

    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: flase
    },

    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true
        }
    }, //necesita validación?

    // Telephone: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    // },


    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },


    gitHubId: {
        type: DataTypes.STRING,
    },  

    gmailId: {
        type: DataTypes.STRING,
      
    },

    facebookId: {
        type: DataTypes.STRING,
       
    },

});

};