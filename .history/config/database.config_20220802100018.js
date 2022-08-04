require('dotenv').config();
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSERNAME, process.env.DBPASS, { dialect: 'mysql', host: process.env.DBHOST });
module.exports = sequelize;

346596346097546
346596108925504
346596320634488
346596363103235
346596737802710