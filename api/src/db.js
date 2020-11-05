require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/development`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });
  
const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Product, Category, User, Review, Order, Payment, NGO } = sequelize.models;

// RELACIONES


//Relacion product 1-----* prodCat *-----1 category 
Product.belongsToMany(Category, { through: 'prodCat' });
Category.belongsToMany(Product, { through: 'prodCat' });

//Relacion user 1-----* review
User.hasMany(Review);   
Review.belongsTo(User);

//Relacion product 1-----* review
Product.hasMany(Review);   
Review.belongsTo(Product);

//Relación order 1-----* payment  //¿Una orden puede tener varios metodos de pago?
Order.hasMany(Payment);           //REVISAR ESTA RELACIÓN
Payment.belongsTo(Order);  

//Relación user 1-----* order  
User.hasMany(Order);
Order.belongsTo(User);

//Relación NGO 1-----* product
NGO.hasMany(Product)
Product.belongsTo(NGO)

//Relación oreder 1-----* orderLine *-----1 product
Order.belongsToMany(Product, { through: 'OrderLine' });
Product.belongsToMany(Order, { through: 'OrderLine' });


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
