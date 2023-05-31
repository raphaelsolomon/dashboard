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

const AuditSafetySystem = sequelize.define('audit_safety_systems', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    last_review_date: {
        type: Sequelize.TEXT,
    },
    date_last_toolbox: {
        type: Sequelize.TEXT
    },
    other_comment: {
        type: Sequelize.TEXT,
    },
    operational_safety_manual_informing_safe_practices_facility: {
        type: Sequelize.TEXT,
    },
    updated_safety_risk_assessment_facility: {
        type: Sequelize.TEXT,
    },
    toolbox_conducted_facility_contractors: {
        type: Sequelize.TEXT
    },
    toolbox_talk_documented: {
        type: Sequelize.TEXT,
    },
    worker_chairs_tables_ergonomic_friendly: {
        type: Sequelize.TEXT,
    },
    workers_computer_screen_excessively_bright: {
        type: Sequelize.TEXT,
    },
    section: {
        type: Sequelize.TEXT,
    },
});

const AuditPermitWork = sequelize.define('audit_permit_works', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    date_last_permit_work_issued: {
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