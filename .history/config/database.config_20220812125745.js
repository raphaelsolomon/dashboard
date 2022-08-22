require('dotenv').config();
const Sequelize = require('sequelize');
var sequelize;
if(process.env.NODE_ENV === 'production')
module.exports = sequelize;