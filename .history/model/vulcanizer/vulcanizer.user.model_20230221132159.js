const Sequelize = require('sequelize');
const sequelize = require('../../config/database.config');

const Vulcanizer_users = sequelize.define('vulcanizer_users', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    firstname: {
        type: Sequelize.STRING,
    },
    lastname: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    phone: {
        type: Sequelize.STRING,
    },
    address: {
        type: Sequelize.TEXT,
    },
    age_group: {
        type: Sequelize.STRING,
    },
    education: {
        type: Sequelize.STRING,
    },
    occupation: {
        type: Sequelize.STRING,
    },
    gender: {
        type: Sequelize.STRING,
    },
    //==================================================================
    tires_repaires_or_replaced: {
        type: Sequelize.STRING,
    },
    vehicle_typically_repaired: {
        type: Sequelize.STRING,
    },
    find_current_vulcanizer: {
        type: Sequelize.STRING,
    },

    satisfactory_with_current_vulcanizer: {
        type: Sequelize.STRING,
    },
    issue_repetition: {
        type: Sequelize.TEXT,
    },
    cost_of_services: {
        type: Sequelize.STRING,
    },

    completion_of_services: {
        type: Sequelize.STRING,
    },
    customer_service_by_vulcanizer: {
        type: Sequelize.STRING,
    },
    issue_with_the_quality_of_work: {
        type: Sequelize.STRING,
    },

    vulcanizer_recommendation: {
        type: Sequelize.STRING,
    },
    tires_inspections: {
        type: Sequelize.STRING,
    },
    ask_for_proper_gears: {
        type: Sequelize.STRING,
    },
    first_aid_kit: {
        type: Sequelize.STRING,
    },
    fire_extinguisher: {
        type: Sequelize.TEXT,
    },
    use_torque_wrench: {
        type: Sequelize.STRING,
    },
    safety_training: {
        type: Sequelize.STRING,
    },
});
module.exports = Vulcanizer_users;