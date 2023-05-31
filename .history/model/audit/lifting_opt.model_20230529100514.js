const Sequelize = require('sequelize');
const sequelize = require('../../config/database.config');

const AuditLiftOpt = sequelize.define('audit_lift_opts', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    date_reported_incident: {
        type: Sequelize.TEXT,
    },
    sight_any_lifting_equipment: {
        type: Sequelize.TEXT
    },
    expired_item_first_aid_box: {
        type: Sequelize.TEXT,
    },
    sufficient_facility: {
        type: Sequelize.TEXT,
    },
    last_recorded_first_box: {
        type: Sequelize.TEXT,
    },
    section: {
        type: Sequelize.TEXT,
    },
});


const AuditReportInjuries = sequelize.define('audit_reporting_injuries', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    lifting_equipment_provided: {
        type: Sequelize.TEXT,
    },
    reporting_injuries_regulatory_body: {
        type: Sequelize.TEXT
    },
    section: {
        type: Sequelize.TEXT,
    },
});

const AuditControlSubstance = sequelize.define('audit_control_subs', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    lifting_equipment_provided: {
        type: Sequelize.TEXT,
    },
    reporting_injuries_regulatory_body: {
        type: Sequelize.TEXT
    },
    section: {
        type: Sequelize.TEXT,
    },
});


module.exports = {AuditLiftOpt, AuditReportInjuries};


