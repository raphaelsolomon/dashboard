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
    monitor_screens_brightness_moderate: {
        type: Sequelize.TEXT,
    },
    yes_how_frequently: {
        type: Sequelize.TEXT
    },
    eye_checks_conducted: {
        type: Sequelize.TEXT
    },
    section: {
        type: Sequelize.TEXT,
    },
});

const AuditLadder = sequelize.define('audit_ladders', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    step_ladders_assist_height_elevation: {
        type: Sequelize.TEXT,
    },
    good_condition: {
        type: Sequelize.TEXT
    },
    section: {
        type: Sequelize.TEXT,
    },
});


const AuditWelFare = sequelize.define('audit_welfares', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    safety_signs_placed_differentiate_male_female_toilets: {
        type: Sequelize.TEXT,
    },
    safety_signage_promoting_personal_hygiene_toilet: {
        type: Sequelize.TEXT
    },
    workers_provided_cloak_rooms_lockers: {
        type: Sequelize.TEXT
    },
    toilets_good_usable_conditions: {
        type: Sequelize.TEXT,
    },
    male_female_toilets_provided: {
        type: Sequelize.TEXT
    },
    descirbe_sign: {
        type: Sequelize.TEXT
    },
    if_no_which_toilet: {
        type: Sequelize.TEXT
    },
    section: {
        type: Sequelize.TEXT,
    },
});

const AuditBankAudit = sequelize.define('audit_welfares', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    date_safety_audit: {
        type: Sequelize.TEXT,
    },
    safety_audit_report_for: {
        type: Sequelize.TEXT
    },
    bank_full_address: {
        type: Sequelize.TEXT
    },
    name_safety_audit_1: {
        type: Sequelize.TEXT,
    },
    name_safety_audit_2: {
        type: Sequelize.TEXT
    },
    name_bank_assessment_participant: {
        type: Sequelize.TEXT
    },
    position_bank_assessment_participant: {
        type: Sequelize.TEXT
    },
    section: {
        type: Sequelize.TEXT,
    },
});

const AuditMgtReviews = sequelize.define('audit_welfares', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    date_safety_audit: {
        type: Sequelize.TEXT,
    },
    safety_audit_report_for: {
        type: Sequelize.TEXT
    },
    bank_full_address: {
        type: Sequelize.TEXT
    },
    name_safety_audit_1: {
        type: Sequelize.TEXT,
    },
    name_safety_audit_2: {
        type: Sequelize.TEXT
    },
    name_bank_assessment_participant: {
        type: Sequelize.TEXT
    },
    position_bank_assessment_participant: {
        type: Sequelize.TEXT
    },
    section: {
        type: Sequelize.TEXT,
    },
});

module.exports = {AuditLiftOpt, AuditReportInjuries, AuditControlSubstance, AuditLadder, AuditWelFare, AuditBankAudit};


