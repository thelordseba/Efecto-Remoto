const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = (sequelize) => {
  const User = sequelize.define("user", {
    userName: {
      type: DataTypes.STRING,
      allowNull: true,
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
      allowNull: true,
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    }, //necesita validación?

    telephone: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: true,
      set(value) {
        if (value) { // tiene que ser sincrónico
          const salt = bcrypt.genSaltSync(saltRounds) // si guardo como contraseña hola dos veces, en la base de datos van a ser diferentes (para que las contraseñas no sean iguales)
          const hash = bcrypt.hashSync(value, salt) // hashea en base 64
          this.setDataValue("password", hash) // le decimos el valor que queremos setear y el hash
        }
      }
    },
    //hay un código en sql documentación para que la pass no se guarde en la BD
    //no se si quieren que la agregue aca o es futura tarea
    gmailId: {
        type: DataTypes.STRING,
    },

    facebookId: {
        type: DataTypes.STRING,
    },
  });

  User.prototype.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
  }
  return User;
};
