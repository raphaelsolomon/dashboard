require('dotenv').config();
const Sequelize = require('sequelize');
var sequelize;
if (process.env.NODE_ENV === 'production') {
    sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSERNAME, process.env.DBPASS, { dialect: 'mysql', host: process.env.DBHOST });
   // sequelize = new Sequelize("u885646101_dech_database", "u885646101_phoenixk54", "Available1.", { dialect: 'mysql', host: "149.100.151.52" });
} else {
    sequelize = new Sequelize('dechcons_dashboard', 'root', 'root', { dialect: 'mysql', host: 'localhost' });
}
module.exports = sequelize;