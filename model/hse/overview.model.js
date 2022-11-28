const Sequelize = require('sequelize');
const sequelize = require('../../config/database.config');

const IncidentOverview = sequelize.define('incidentoverviews', {
    date: {
        type: Sequelize.DATE,
    },

    near_miss: {
        type: Sequelize.STRING,
    },
    near_miss_remark: {
        type: Sequelize.STRING,
    },

    lost_time_injury: {
        type: Sequelize.STRING,
    },
    lost_time_injury_remark: {
        type: Sequelize.STRING,
    },

    medical_treatment: {
        type: Sequelize.STRING,
    },
    medical_treatment_remark: {
        type: Sequelize.STRING,
    },

    first_aid_case: {
        type: Sequelize.STRING,
    },
    first_aid_case_remark: {
        type: Sequelize.STRING,
    },

    fatality: {
        type: Sequelize.STRING,
    },
    fatality_remark: {
        type: Sequelize.STRING,
    },

    permanent_disability: {
        type: Sequelize.STRING,
    },
    permanent_disability_remark: {
        type: Sequelize.STRING,
    },

    permanent_partial_disability: {
        type: Sequelize.STRING,
    },
    permanent_partial_disability_remark: {
        type: Sequelize.STRING,
    },

    road_traffic_accident: {
        type: Sequelize.STRING,
    },
    road_traffic_accident_remark: {
        type: Sequelize.STRING,
    },

    property_damage: {
        type: Sequelize.STRING,
    },
    property_damage_remark: {
        type: Sequelize.STRING,
    },

    environmental_incident: {
        type: Sequelize.STRING,
    },
    environmental_incident_remark: {
        type: Sequelize.STRING,
    },

    other_incident: {
        type: Sequelize.STRING,
    },
    other_incident_remark: {
        type: Sequelize.STRING,
    }
});

module.exports = IncidentOverview;