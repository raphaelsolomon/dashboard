const Sequelize = require('sequelize');
const sequelize = require('../../config/database.config');

const AuditFirePrecautions = sequelize.define('audit_fire_precautions', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    state: {
        type: Sequelize.TEXT,
    },
    section: {
        type: Sequelize.TEXT
    },
});

const AuditStairCases = sequelize.define('audit_stairs_staircases', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    are_all_guardrails_present: {
        type: Sequelize.TEXT,
    },
    did_you_sight_any_faulty_guardrails: {
        type: Sequelize.TEXT,
    },
    state: {
        type: Sequelize.TEXT,
    },
    state: {
        type: Sequelize.TEXT,
    },
    state: {
        type: Sequelize.TEXT,
    },
    section: {
        type: Sequelize.TEXT
    },
   
});

module.exports = {AuditFirePrecautions, AuditStairCases};