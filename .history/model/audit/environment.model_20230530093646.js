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
    if_sighted1: {
        type: Sequelize.TEXT,
    },
    if_sighted2: {
        type: Sequelize.TEXT,
    },
   
});

module.exports = {AuditFirePrecautions, };