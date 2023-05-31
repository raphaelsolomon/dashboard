require('dotenv').config();
const Sequelize = require('sequelize');
var sequelize;
if (process.env.NODE_ENV === 'production') {
   // sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSERNAME, process.env.DBPASS, { dialect: 'mysql', host: process.env.DBHOST });
    sequelize = new Sequelize("id20829920_dech_database", "id20829920_phoenixk54", "Available1.", { dialect: 'mysql', host: process.env.DBHOST });
} else {
    //sequelize = new Sequelize('dechcons_dashboard', 'root', 'root', { dialect: 'mysql', host: 'localhost' });
    sequelize = new Sequelize("u885646101_dech_database", "id20829920_phoenixk54", "Available1.", { dialect: 'mysql', host: process.env.DBHOST });
}
module.exports = sequelize;