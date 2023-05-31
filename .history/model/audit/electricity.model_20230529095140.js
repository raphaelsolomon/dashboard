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
    safety_training_been_conducted_recently: {
        type: Sequelize.TEXT,
    },
    training_attendance: {
        type: Sequelize.TEXT,
    }
});

module.exports = AuditElectricity;