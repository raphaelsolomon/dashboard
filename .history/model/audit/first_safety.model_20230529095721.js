const Sequelize = require('sequelize');
const sequelize = require('../../config/database.config');

const AuditFirstSafeties = sequelize.define('auditFirsts', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    where_not_locked: {
        type: Sequelize.TEXT,
    },
    if_sighted: {
        type: Sequelize.TEXT
    },
    if_sighted1: {
        type: Sequelize.TEXT,
    },
    if_sighted2: {
        type: Sequelize.TEXT,
    },
    last_review_date_fire_risk_assessment: {
        type: Sequelize.TEXT,
    },
    electrical_distribution_boxes_securely_locked: {
        type: Sequelize.TEXT
    },
    sight_any_trailing_cables: {
        type: Sequelize.TEXT,
    },
    sight_any_exposed_naked_wires: {
        type: Sequelize.TEXT,
    },
    faulty_sockets_switches: {
        type: Sequelize.TEXT,
    },
    fire_risk_assessment: {
        type: Sequelize.TEXT
    },
    procedure_monitoring_electrical_appliances: {
        type: Sequelize.TEXT,
    },
    section: {
        type: Sequelize.TEXT,
    },
});

module.exports = AuditElectricity;