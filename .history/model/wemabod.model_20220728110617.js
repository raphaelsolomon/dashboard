const Sequelize = require('sequelize');
const sequelize = require('../config/database.config');

const Wemabod = sequelize.define('wemabods', {
    date: {
        type: Sequelize.STRING
    },
    time: {
        type: Sequelize.STRING,
    },
    movemwnt_by_vehicle_resident: {
        type: Sequelize.IN
    }
});

module.exports = Wemabod;