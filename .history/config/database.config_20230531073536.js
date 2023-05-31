require('dotenv').config();
const Sequelize = require('sequelize');
var sequelize;
if(process.env.NODE_ENV === 'production') {
    sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSERNAME, process.env.DBPASS, { dialect: 'mysql', host: process.env.DBHOST });
    sequelize = new Sequelize("dech_database"," process.env.DBUSERNAME", process.env.DBPASS, { dialect: 'mysql', host: process.env.DBHOST });
}else {
    sequelize = new Sequelize('dechcons_dashboard', 'root', 'root', { dialect: 'mysql', host: 'localhost' });
}
module.exports = sequelize;