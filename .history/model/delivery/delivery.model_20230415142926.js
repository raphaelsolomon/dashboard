const Sequelize = require('sequelize');
const sequelize = require('../../config/database.config');

const Delivery = sequelize.define('deliveries', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    address: {
        type: Sequelize.TEXT,
    },
    gender: {
        type: Sequelize.STRING
    },
    age_group: {
        type: Sequelize.STRING,
    },
    emp_status: {
        type: Sequelize.STRING,
    },
    primary_reason: {
        type: Sequelize.STRING,
    },
    how_often: {
        type: Sequelize.STRING,
    },
    satisfaction: {
        type: Sequelize.STRING,
    },
    delivery_arrival: {
        type: Sequelize.STRING,
    },
    accuracy_of_delivery: {
        type: Sequelize.STRING,
    },
    stress_reducing_activity: {
        type: Sequelize.STRING,
    },
    hours_per_night: {
        type: Sequelize.STRING,
    },
    change_in_lifestyle: {
        type: Sequelize.STRING,
    },
    factor_considered: {
        type: Sequelize.STRING,
    },
    suggestions: {
        type: Sequelize.STRING,
    }
   
});
module.exports = Delivery;