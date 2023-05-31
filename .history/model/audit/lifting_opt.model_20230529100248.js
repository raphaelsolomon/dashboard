const Sequelize = require('sequelize');
const sequelize = require('../../config/database.config');

const AuditLiftOpt = sequelize.define('audit_lift_opts', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    issued_first_aid_treatment: {
        type: Sequelize.TEXT,
    },
    other_first_aid_equipment: {
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

module.exports = AuditLiftOpt;