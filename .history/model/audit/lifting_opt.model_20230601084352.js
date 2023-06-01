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

const AuditDisplayMonitor = sequelize.define('audit_displays', {
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

const AuditHandTools = sequelize.define('audit_hand_tools', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    mechanical_tools_good_condition: {
        type: Sequelize.TEXT,
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
    safety_signs_placed: {
        type: Sequelize.TEXT,
    },
    safety_signage_promoting: {
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

const AuditBankAudit = sequelize.define('audit_banks', {
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

const AuditExecutiveSummary = sequelize.define('audit_exe_summaries', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    designated_handler: {
        type: Sequelize.TEXT,
    },
    hse_personel_on_ground: {
        type: Sequelize.TEXT
    },
    safety_concern: {
        type: Sequelize.TEXT
    },
    state_policy: {
        type: Sequelize.TEXT,
    },
    fire_extinguishers: {
        type: Sequelize.TEXT,
    },
    section: {
        type: Sequelize.TEXT,
    },
});

const AuditMgtReviews = sequelize.define('audit_mgt_reviews', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    hse_meeting: {
        type: Sequelize.TEXT,
    },
    evidence_discussed: {
        type: Sequelize.TEXT
    },
    date_last_meeting: {
        type: Sequelize.TEXT
    },
    other_comment: {
        type: Sequelize.TEXT,
    },
    section: {
        type: Sequelize.TEXT,
    },
});

const AuditInsurance = sequelize.define('audit_insurances', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    when_paid_last: {
        type: Sequelize.TEXT,
    },
    other_comment: {
        type: Sequelize.TEXT
    },
    evidence_workers_compensation: {
        type: Sequelize.TEXT
    },
    evidence_building_occupancy_insurance: {
        type: Sequelize.TEXT,
    },
    when_paid_last_insurance: {
        type: Sequelize.TEXT
    },
    section: {
        type: Sequelize.TEXT,
    },
});

const AuditEmergencyProceedure = sequelize.define('audit_emergency_proceedures', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    last_review_date: {
        type: Sequelize.TEXT,
    },
    date_emergency_drill: {
        type: Sequelize.TEXT
    },
    name_hospital: {
        type: Sequelize.TEXT
    },
    other_comment: {
        type: Sequelize.TEXT,
    },
    evidence_documented_emergency_response_plan: {
        type: Sequelize.TEXT,
    },
    emergency_drill_been_conducted_lately: {
        type: Sequelize.TEXT
    },
    evidence_appointed_fire_wardens: {
        type: Sequelize.TEXT
    },
    registered_retainers_hospital_branch: {
        type: Sequelize.TEXT,
    },
    section: {
        type: Sequelize.TEXT,
    },
});

const AuditSafetyPolicy = sequelize.define('audit_safety_policies', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    last_review_date: {
        type: Sequelize.TEXT,
    },
    staff_aware_safety_policy: {
        type: Sequelize.TEXT
    },
    other_comment: {
        type: Sequelize.TEXT
    },
    safety_policy_sighted_around_branch: {
        type: Sequelize.TEXT,
    },
    section: {
        type: Sequelize.TEXT,
    },
});

const AuditIncident = sequelize.define('audit_incidents', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    request_hse_incident_log: {
        type: Sequelize.TEXT,
    },
    last_recorded_incident: {
        type: Sequelize.TEXT
    },
    regulatory_agencies_occupational_incidents_accidents_reported_to: {
        type: Sequelize.TEXT
    },
    other_comment: {
        type: Sequelize.TEXT,
    },
    occupational_incident_accident: {
        type: Sequelize.TEXT,
    },
    section: {
        type: Sequelize.TEXT,
    },
});

const AuditControl = sequelize.define('audit_control_substances', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    request_hse_incident_log: {
        type: Sequelize.TEXT,
    },
    last_recorded_incident: {
        type: Sequelize.TEXT
    },
    regulatory_agencies_occupational_incidents_accidents_reported_to: {
        type: Sequelize.TEXT
    },
    other_comment: {
        type: Sequelize.TEXT,
    },
    occupational_incident_accident: {
        type: Sequelize.TEXT,
    },
    section: {
        type: Sequelize.TEXT,
    },
});

module.exports = { AuditLiftOpt, AuditReportInjuries, AuditControlSubstance, AuditLadder, 
    AuditWelFare, AuditBankAudit, AuditExecutiveSummary, AuditMgtReviews, AuditInsurance,
    AuditEmergencyProceedure, AuditSafetyPolicy, AuditIncident, AuditHandTools, AuditDisplayMonitor};


