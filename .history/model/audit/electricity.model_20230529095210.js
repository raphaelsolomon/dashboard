const Sequelize = require('sequelize');
const sequelize = require('../../config/database.config');

const AuditElectricity = sequelize.define('auditTrainings', {
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
    if_sighted1: {
        type: Sequelize.TEXT,
    },
    if_sighted2: {
        type: Sequelize.TEXT,
    },
});

module.exports = AuditElectricity;