require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_DEPLOY } = process.env;


const sequelize = new Sequelize(
  `postgresql://postgres:diTQh2OC1JP56vN1fZyN@containers-us-west-166.railway.app:7208/railway`,
  {
    logging: false,
    native: false,
  }
);

const basename = path.basename(__filename);

const modelDefiners = [];

//* Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

//* Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

//* En sequelize.models están todos los modelos importados como propiedades
//* Para relacionarlos hacemos un destructuring
const { Comments, Posts, Roles, User_data, Users, Mercado_pago, Devdata } = sequelize.models;

//? Aca vendrian las relaciones y la creacion de la tabla intermedia
Users.hasOne(User_data, { foreignKey: 'id_users' });
Roles.hasOne(User_data, { foreignKey: 'id_roles' });

User_data.hasMany(Posts, { foreignKey: 'id_user_data' })
Posts.belongsTo(User_data,{ foreignKey: 'id_user_data' })

Posts.hasMany(Comments, { foreignKey: 'id_post' })
Comments.belongsTo(Posts, { foreignKey: 'id_post' })

User_data.hasMany(Comments, {foreignKey: 'id_user_data' })
Comments.belongsTo(User_data, {foreignKey: 'id_user_data' })

Mercado_pago.hasOne(Mercado_pago, { foreignKey: 'id_pay'})
User_data.hasOne(Devdata, { foreignKey: 'id_user_data' } )


//ver relacion comentarios y user_data



module.exports = {
  sequelize,
  ...sequelize.models, 
  conn: sequelize,     // para importar la conexión { conn } = require('./db.js');
};