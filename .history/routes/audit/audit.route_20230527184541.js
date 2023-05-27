const express = require("express");
const route = express.Router();
let payload  = {};

route.get('/', async (req, res) => {
    res.status(200).render('../audit/index', { alert: [] });
});

route.post('/', async (req, res) => {
    //=======================================SATUTORY COMPLIANCE================================
    payload['electricity'] = {
        where_not_locked: req.body['Statutory_Compliance[Electricity][where_not_locked]'],
        if_sighted: req.body['Statutory_Compliance[Electricity][if_sighted]'],
        if_sighted1: req.body['Statutory_Compliance[Electricity][if_sighted1]'],
        if_sighted2: req.body['Statutory_Compliance[Electricity][if_sighted2]'],
        last_review_date_fire_risk_assessment: req.body['Statutory_Compliance[Electricity][last_review_date_fire_risk_assessment]'],
        electrical_distribution_boxes_securely_locked: req.body['Statutory_Compliance[Electricity][electrical_distribution_boxes_securely_locked]'],
        sight_any_trailing_cables: req.body['Statutory_Compliance[Electricity][sight_any_trailing_cables]'],
        sight_any_exposed_naked_wires: req.body['Statutory_Compliance[Electricity][sight_any_exposed_naked_wires]'],
        faulty_sockets_switches: req.body['Statutory_Compliance[Electricity][faulty_sockets_switches]'],
        fire_risk_assessment: req.body['Statutory_Compliance[Electricity][fire_risk_assessment]'],
        procedure_monitoring_electrical_appliances: req.body['Statutory_Compliance[Electricity][procedure_monitoring_electrical_appliances]'],
        section: 'Statutory_Compliance'
    };
    payload['first_safety'] = {
        free_obstruction: req.body['Statutory_Compliance[free_obstruction][free_obstruction]'],
        fire_extinguishers_hung_wall: req.body['Statutory_Compliance[free_obstruction][fire_extinguishers_hung_wall]'],
        other_fire_fighting_equipment_installed: req.body['Statutory_Compliance[free_obstruction][other_fire-fighting_equipment_installed]'],
        fire_service_certificate: req.body['Statutory_Compliance[free_obstruction][fire_service_certificate]'],
        fire_equipment: req.body['Statutory_Compliance[free_obstruction][fire_equipment]'],
        classes_fire_extinguishers: req.body['Statutory_Compliance[free_obstruction][classes_fire_extinguishers]'],
        fire_extinguishers_present: req.body['Statutory_Compliance[free_obstruction][fire_extinguishers_present]'],
        where_fire_extinguisher_obstructed: req.body['Statutory_Compliance[free_obstruction][where_fire_extinguisher_obstructed]'],
        where_placed_floor: req.body['Statutory_Compliance[free_obstruction][where_placed_floor]'],
        fire_extinguishers_serviced_last: req.body['Statutory_Compliance[free_obstruction][fire_extinguishers_serviced_last]'],
        expiring_date_fire_extinguishers: req.body['Statutory_Compliance[free_obstruction][expiring_date_fire_extinguishers]'],
        section: 'Statutory_Compliance'
    };
    payload['first_aid'] = {
        issued_first_aid_treatment: req.body['Statutory_Compliance[first_aid][issued_first-aid_treatment]'],
        other_first_aid_equipment: req.body['Statutory_Compliance[first_aid][other_first-aid_equipment]'],
        expired_item_first_aid_box: req.body['Statutory_Compliance[first_aid][expired_item_first_aid_box]'],
        sufficient_facility: req.body['Statutory_Compliance[first_aid][sufficient_facility]'],
        last_recorded_first_box: req.body['Statutory_Compliance[first_aid][last_recorded_first_box?]'],
        section: 'Statutory_Compliance'
    };
    payload['lifting_operations'] = {
        date_reported_incident: req.body['Statutory_Compliance[lifting_operations][Date_reported_incident]'],
        sight_any_lifting_equipment: req.body['Statutory_Compliance[lifting_operations][sight_any_lifting_equipment]'],
        section: 'Statutory_Compliance'
    };
    payload['reporting_injuries'] = {
        lifting_equipment_provided: req.body['Statutory_Compliance[reporting_injuries][lifting_equipment_provided]'],
        reporting_injuries_regulatory_body: req.body['Statutory_Compliance[lifting_operations][reporting_injuries_regulatory_body]'],
        section: 'Statutory_Compliance'
    };
    payload['control_substances'] = {
        monitor_screens_brightness_moderate: req.body['Statutory_Compliance[control_substances][monitor_screens_brightness_moderate]'],
        yes_how_frequently: req.body['Statutory_Compliance[control_substances][yes_how_frequently]'],
        eye_checks_conducted: req.body['Statutory_Compliance[control_substances][eye_checks_conducted]'],
        section: 'Statutory_Compliance'
    };
    //==================================WORK EQUIPMENT COMPLETED++++++++++++++++++++++++++++++++++
    payload['ladders'] = {
        step_ladders_assist_height_elevation: req.body['work_equipment[ladders][step_ladders_ assist_height_elevation]'],
        good_condition: req.body['work_equipment[ladders][good_condition]'],
        section: 'work_equipment'
    };
    payload['handtools'] = {
        mechanical_tools_good_condition: req.body['work_equipment[handtools][mechanical_tools_good_condition]'],
        section: 'work_equipment'
    };
    //===================================WElFARE COMPLETED=================================
    payload['welfare'] = {
        safety_signs_placed_differentiate_male_female_toilets: req.body['welfare_facilities[Welfare][safety_signs_placed_differentiate_male_female_toilets]'],
        safety_signage_promoting_personal_hygiene_toilet: req.body['welfare_facilities[Welfare][safety_signage_promoting_personal_hygiene_toilet]'],
        workers_provided_cloak_rooms_lockers: req.body['welfare_facilities[Welfare][workers_provided_cloak-_rooms/lockers]'],
        toilets_good_usable_conditions: req.body['welfare_facilities[Welfare][toilets_good_usable_conditions]'],
        male_female_toilets_provided: req.body['welfare_facilities[Welfare][male_female_toilets_provided]'],
        descirbe_sign: req.body['welfare_facilities[Welfare][descirbe_sign]'],
        if_no_which_toilet: req.body['welfare_facilities[Welfare][if_no_which_toilet]'],
        section: 'welfare_facilities'
    };
    //================================INTRODUCTION COMPLETED=====================================================
    payload['bank_audit'] = {
        date_safety_audit: req.body['introduction[bank_audit][Date_safety_audit]'],
        safety_audit_report_for: req.body['introduction[bank_audit][Safety_audit_report_for]'],
        bank_full_address: req.body['introduction[bank_audit][bank_full_address]'],
        name_safety_audit_1: req.body['introduction[bank_audit][name_safety_audit_1]'],
        name_safety_audit_2: req.body['introduction[bank_audit][name_safety_audit_2]'],
        name_bank_assessment_participant: req.body['introduction[bank_audit][name_bank_assessment_participant]'],
        position_bank_assessment_participant: req.body['introduction[bank_audit][position_bank_assessment_participant]'],
        section: 'introduction'
    };
    payload['executive_summary'] = {
        designated_handler: req.body['introduction[executive_summary][designated_handler]'],
        hse_personel_on_ground: req.body['introduction[executive_summary][hse_personel_on ground]'],
        safety_concern: req.body['introduction[executive_summary][safety_concern]'],
        state_policy: req.body['introduction[executive_summary][state_policy]'],
        fire_extinguishers: req.body['introduction[executive_summary][fire_extinguishers]'],
        section: 'introduction'
    };
    //================================Administration Procedure COMPLETED=====================================================
    payload['management_review'] = {
        hse_meeting: req.body['Administration_Procedure[Management_Review][hse_meeting]'],
        evidence_discussed: req.body['Administration_Procedure[Management_Review][evidence_discussed]'],
        date_last_meeting: req.body['Administration_Procedure[Management_Review][date_last_meeting]'],
        other_comment: req.body['Administration_Procedure[Management_Review][other_comment]'],
        section: 'administration_procedure'
    };
    payload['insurance'] = {
        when_paid_last: req.body['Administration_Procedure[Insurance][when_paid_last]'],
        other_comment: req.body['Administration_Procedure[Insurance][other_comment]'],
        evidence_workers_compensation: req.body['Administration_Procedure[Insurance][evidence_workers_compensation]'],
        evidence_building_occupancy_insurance: req.body['Administration_Procedure[Insurance][evidence_building_occupancy_insurance]'],
        section: 'administration_procedure'
    };
    payload['emergency_procedure'] = {
        last_review_date: req.body['Administration_Procedure[Emergency_Procedure][last_review_date]'],
        date_emergency_drill: req.body['Administration_Procedure[Emergency_Procedure][Date_emergency_drill]'],
        name_hospital: req.body['Administration_Procedure[Emergency_Procedure][Name_Hospital]'],
        other_comment: req.body['Administration_Procedure[Emergency_Procedure][other_comment]'],
        evidence_documented_emergency_response_plan: req.body['Administration_Procedure[Emergency_Procedure][evidence_documented_emergency_response_plan]'],
        emergency_drill_been_conducted_lately: req.body['Administration_Procedure[Emergency_Procedure][emergency_drill_been_conducted_lately]'],
        evidence_appointed_fire_wardens: req.body['Administration_Procedure[Emergency_Procedure][evidence_appointed_fire_wardens]'],
        registered_retainers_hospital_branch: req.body['Administration_Procedure[Emergency_Procedure][registered_retainers_hospital_branch]'],
        section: 'administration_procedure'
    };
    payload['safety_policy'] = {
        last_review_date: req.body['Administration_Procedure[Safety_Policy][last_review_date]'],
        staff_aware_safety_policy: req.body['Administration_Procedure[Safety_Policy][staff_aware_safety_policy]'],
        other_comment: req.body['Administration_Procedure[Safety_Policy][other_comment]'],
        safety_policy_sighted_around_branch: req.body['Administration_Procedure[Safety_Policy][safety_policy_sighted_around_branch]'],
        section: 'administration_procedure'
    };
    payload['incident_accident'] = {
        request_hse_incident_log: req.body['Administration_Procedure[incident_accident][Request_HSE_incident_log]'],
        last_recorded_incident: req.body['Administration_Procedure[incident_accident][Last_recorded_incident]'],
        regulatory_agencies_occupational_incidents_accidents_reported_to: req.body['Administration_Procedure[incident_accident][regulatory_agencies_occupational_incidents/accidents_reported_to]'],
        other_comment: req.body['Administration_Procedure[incident_accident][other_comment]'],
        occupational_incident_accident: req.body['Administration_Procedure[incident_accident][occupational_incident/accident]'],
        section: 'administration_procedure'
    };
    payload['waste_management'] = {
        name_lawma_contractor: req.body['Administration_Procedure[waste_management][name_lawma_contractor]'],
        frequently_waste_picked: req.body['Administration_Procedure[waste_management][frequently_waste_picked]'],
        other_comment: req.body['Administration_Procedure[waste_management][other_comment]'],
        lawma_approved_contractor_picks_waste: req.body['Administration_Procedure[waste_management][Lawma_approved_contractor_picks_waste]'],
        waste_segregation_practiced: req.body['Administration_Procedure[waste_management][waste_segregation_practiced]'],
        sight_waste_bins_around_premises: req.body['Administration_Procedure[waste_management][sight_waste_bins_around_premises]'],
        section: 'administration_procedure'
    };
    payload['training'] = {
        training_topic: req.body['Administration_Procedure[Training][training_topic]'],
        other_comment: req.body['Administration_Procedure[Training][other_comment]'],
        safety_training_been_conducted_recently: req.body['Administration_Procedure[Training][safety_training_been_conducted_recently]'],
        training_attendance: req.body['Administration_Procedure[Training][training attendance]'],
        section: 'administration_procedure'
    };
    payload['safe_system'] = {
        last_review_date: req.body['Administration_Procedure[safe_system][last_review_date]'],
        date_last_toolbox: req.body['Administration_Procedure[safe_system][date_last_toolbox]'],
        other_comment: req.body['Administration_Procedure[safe_system][other_comment]'],
        operational_safety_manual_informing_safe_practices_facility: req.body['Administration_Procedure[safe_system][operational_safety_manual_informing_safe_practices_facility]'],
        updated_safety_risk_assessment_facility: req.body['Administration_Procedure[safe_system][updated_safety_risk_assessment_facility]'],
        updated_safety_risk_assessment_facility: req.body['Administration_Procedure[safe_system][updated_safety_risk_assessment_facility]'],
        updated_safety_risk_assessment_facility: req.body['Administration_Procedure[safe_system][updated_safety_risk_assessment_facility]'],
        updated_safety_risk_assessment_facility: req.body['Administration_Procedure[safe_system][updated_safety_risk_assessment_facility]'],
        updated_safety_risk_assessment_facility: req.body['Administration_Procedure[safe_system][updated_safety_risk_assessment_facility]'],
        section: 'administration_procedure'
    };
    console.log(req.body);
    res.status(200).json('');
});

route.get('/introduction', async (req, res) => {
    res.status(200).render('../audit/inputs/introduction', { alert: [] });
});

route.get('/introduction', async (req, res) => {
    res.status(200).render('../audit/inputs/introduction', { alert: [] });
});
route.get('/section1', async (req, res) => {
    res.status(200).render('../audit/inputs/section1', { alert: [] });
});
route.get('/section2', async (req, res) => {
    res.status(200).render('../audit/inputs/section2', { alert: [] });
});
route.get('/section3', async (req, res) => {
    res.status(200).render('../audit/inputs/section3', { alert: [] });
});
route.get('/section4', async (req, res) => {
    res.status(200).render('../audit/inputs/section4', { alert: [] });
});
route.get('/section5', async (req, res) => {
    res.status(200).render('../audit/inputs/section5', { alert: [] });
});
route.get('/section6', async (req, res) => {
    res.status(200).render('../audit/inputs/section6', { alert: [] });
});
route.get('/preview', async (req, res) => {
    res.status(200).render('../audit/inputs/preview', { alert: [] });
});


module.exports = route;