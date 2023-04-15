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
    experience_delay: {
        type: Sequelize.STRING,
    },
    continue_using_provider: {
        type: Sequelize.STRING,
    },
    difficulties_in_application: {
        type: Sequelize.STRING,
    },
    notification_updates: {
        type: Sequelize.STRING,
    },
    application_friendly: {
        type: Sequelize.STRING,
    },
    //================================================================

    how_satisfied: {
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
    experience_delay: {
        type: Sequelize.STRING,
    },
    continue_using_provider: {
        type: Sequelize.STRING,
    },
    difficulties_in_application: {
        type: Sequelize.STRING,
    },
    notification_updates: {
        type: Sequelize.STRING,
    },
    application_friendly: {
        type: Sequelize.STRING,
    },


   
});
module.exports = Delivery;