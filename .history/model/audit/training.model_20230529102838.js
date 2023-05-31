const Sequelize = require('sequelize');
const sequelize = require('../../config/database.config');

const AuditTraining = sequelize.define('auditTrainings', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    training_topic: {
        type: Sequelize.TEXT,
    },
    other_comment: {
        type: Sequelize.TEXT
    },
    safety_training_been_conducted_recently: {
        type: Sequelize.TEXT,
    },
    training_attendance: {
        type: Sequelize.TEXT,
    },
    section: {
        type: Sequelize.TEXT,
    },
});

module.exports = { AuditTraining, };