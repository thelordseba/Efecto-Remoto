//exportar 
//definir el modelo de Usuario

//copio y pego lo de product.js de prueba
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
//defino el modelo como en product

sequelize.define('user', {
    //en name tengo que hacer una función por firstname y lastname= por 
    //
    userName: {
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
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true
        }
    }, //necesita validación?

    Telephone: {
        type: DataTypes.STRING,
        allowNull: false,
    },


    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
//hay un código en sql documentación para que la pass no se guarde en la BD
//no se si quieren que la agregue aca o es futura tarea

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