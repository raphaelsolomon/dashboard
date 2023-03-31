const Sequelize = require('sequelize');
const sequelize = require('../../config/database.config');

const Older = sequelize.define('olders', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    address: {
        type: Sequelize.TEXT,
    },
    age_group: {
        type: Sequelize.STRING,
    },
    physical_activity: {
        type: Sequelize.STRING,
    },
    activity_types: {
        type: Sequelize.STRING,
    },
    balance_diet: {
        type: Sequelize.STRING,
    },
    social_activities: {
        type: Sequelize.STRING,
    },
    community_involvement: {
        type: Sequelize.STRING,
    },
    cognitive_activity: {
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
module.exports = Older;