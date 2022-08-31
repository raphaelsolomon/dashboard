const Sequelize = require('sequelize');
const sequelize = require('../config/database.config');

const Wemabod = sequelize.define('wemabods', {
    date: {
        type: Sequelize.DATEONLY
    },
    from_time: {
        type: Sequelize.TIME,
    },
    to_time: {
        type: Sequelize.TIME,
    },
    movement_by_vehicle_resident: {
        type: Sequelize.INTEGER
    },
    movement_by_vehicle_staff: {
        type: Sequelize.INTEGER
    },
    movement_by_vehicle_visitor: {
        type: Sequelize.INTEGER
    },
    movement_by_vehicle_cab_service: {
        type: Sequelize.INTEGER
    },
    movement_by_vehicle_delivery: {
        type: Sequelize.INTEGER
    },
    police_matters_all_npf: {
        type: Sequelize.INTEGER
    },
    man_matters: {
        type: Sequelize.INTEGER
    },
    hospital_matters: {
        type: Sequelize.INTEGER
    },
    street_visited_adeojo: {
        type: Sequelize.INTEGER
    },
    street_visited_eleruwa: {
        type: Sequelize.INTEGER
    },
    street_visited_olorunnimbe: {
        type: Sequelize.INTEGER
    },
    street_visited_ojora: {
        type: Sequelize.INTEGER
    },
    street_visited_eric_moore: {
        type: Sequelize.INTEGER
    },
    movement_by_ped_staff: {
        type: Sequelize.INTEGER
    },
    movement_by_ped_visitor: {
        type: Sequelize.INTEGER
    },
    movement_by_ped_resident: {
        type: Sequelize.INTEGER
    },
});
''.toLo
module.exports = Wemabod;
