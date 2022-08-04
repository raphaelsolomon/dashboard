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
        type: Sequelize.INTEGER
    },
    movemwnt_by_vehicle_staff: {
        type: Sequelize.INTEGER
    },
    movemwnt_by_vehicle_visitor: {
        type: Sequelize.INTEGER
    },
    movemwnt_by_vehicle_cab_service: {
        type: Sequelize.INTEGER
    },
    movemwnt_by_vehicle_resident: {
        type: Sequelize.INTEGER
    },
});

module.exports = Wemabod;