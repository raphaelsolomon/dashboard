require('dotenv').config();
const bcrypt = require('bcrypt');
const fs = require('fs');
const http = require('http');
const path = require('path');


exports.verifyPassword = (password, hash) => {
    const verify = bcrypt.compareSync(password, hash);
    if (verify) {
        return true;
    }
    return false;
}

exports.download = (url, dest, cb) => {
    const file = fs.createWriteStream(dest);

    const request = http.get(url, (response) => {
        // check if response is success
        if (response.statusCode !== 200) {
            return cb('Response status was ' + response.statusCode);
        }

        response.pipe(file);
    });

    // close() is async, call cb after close completes
    file.on('finish', () => file.close(cb));

    // check for request error too
    request.on('error', (err) => {
        fs.unlink(dest, () => cb(err.message)); // delete the (partial) file and then return the error
    });

    file.on('error', (err) => { // Handle errors
        fs.unlink(dest, () => cb(err.message)); // delete the (partial) file and then return the error
    });
};

exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(200).redirect('/login');
}

exports.isGoogleAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(200).redirect('/salon/login');
}

exports.options = {
    key: fs.readFileSync(path.resolve(__dirname, './../ssl/dechdash_net.key')),
    cert: fs.readFileSync(path.resolve(__dirname, './../ssl/dechdash_net.crt')),
   // ca: fs.readFileSync(path.resolve(__dirname, './../ssl/dechdash_net.ca-bundle')),
}

exports.payloadAudit = (req) => {
    let payload = {};
    //=======================================ENVIRONMENTS===========================
    payload['fire_precautions'] = {
        state: req.body['Environment[fire_precautions][state]'],
    }
    payload['temperature'] = {
        temp_well_regulated: req.body['Environment[temperature][temp_well_regulated]'],
        expose_to_extreme_cold: req.body['Environment[temperature][expose_to_extreme_cold]'],
        expose_to_extreme_cold_where: req.body['Environment[temperature][expose_to_extreme_cold_where]'],
        expose_to_extreme_heat: req.body['Environment[temperature][expose_to_extreme_heat]'],
        expose_to_extreme_heat_where: req.body['Environment[temperature][expose_to_extreme_heat_where]']
    }
    payload['access_exit'] = {
        access_door_free_from_obs: req.body['Environment[access_exit][access_door_free_from_obs]'],
        exit_door_free_from_obs: req.body['Environment[access_exit][exit_door_free_from_obs]'],
        are_safety_sign_placed_at_access_door: req.body['Environment[access_exit][are_safety_sign_placed_at_access_door]'],
        are_safety_sign_placed_at_exit_door: req.body['Environment[access_exit][access_door_free_from_obs]'],
    }
     //=======================================IMAGES================================
     payload['images'] = {
        poor_house_keeping: req.body['paths[poor_house_keeping]'],
        trailing_cable: req.body['paths[trailing_cable]'],
        fire_fighting_equipment: req.body['paths[fire_fighting_equipment]'],
        waste_area: req.body['paths[waste_area]'],
        stairs_and_staircase: req.body['paths[stairs_and_staircase]'],
        safety_signs: req.body['paths[safety_signs]'],
        workstations: req.body['paths[workstations]'],
        toilets: req.body['paths[toilets]'],
        lighting: req.body['paths[lighting]'],
        muster_point: req.body['paths[muster_point]'],
        hazard_spotted: req.body['paths[hazard_spotted]'],
        generator_area: req.body['paths[generator_area]'],
        front_of_the_bank: req.body['paths[front_of_the_bank]'],
        section: 'images',
        userId: req.user.id 
     }
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
        section: 'Statutory_Compliance',
        userId: req.user.id 
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
        section: 'Statutory_Compliance',
        userId: req.user.id 
    };
    payload['first_aid'] = {
        issued_first_aid_treatment: req.body['Statutory_Compliance[first_aid][issued_first-aid_treatment]'],
        other_first_aid_equipment: req.body['Statutory_Compliance[first_aid][other_first-aid_equipment]'],
        expired_item_first_aid_box: req.body['Statutory_Compliance[first_aid][expired_item_first_aid_box]'],
        sufficient_facility: req.body['Statutory_Compliance[first_aid][sufficient_facility]'],
        last_recorded_first_box: req.body['Statutory_Compliance[first_aid][last_recorded_first_box?]'],
        section: 'Statutory_Compliance',
        userId: req.user.id 
    };
    payload['lifting_operations'] = {
        lifting_equipment_provided: req.body['Statutory_Compliance[lifting_operations][lifting_equipment_provided]'],
        sight_any_lifting_equipment: req.body['Statutory_Compliance[lifting_operations][sight_any_lifting_equipment]'],
        section: 'Statutory_Compliance',
        userId: req.user.id 
    };
    payload['reporting_injuries'] = {
        date_reported_incident: req.body['Statutory_Compliance[reporting_injuries][Date_reported_incident]'],
        reporting_injuries_regulatory_body: req.body['Statutory_Compliance[reporting_injuries][reporting_injuries_regulatory_body]'],
        section: 'Statutory_Compliance',
        userId: req.user.id 
    };
    payload['control_substances'] = {
        monitor_screens_brightness_moderate: req.body['Statutory_Compliance[control_substances][monitor_screens_brightness_moderate]'],
        yes_how_frequently: req.body['Statutory_Compliance[control_substances][yes_how_frequently]'],
        eye_checks_conducted: req.body['Statutory_Compliance[control_substances][eye_checks_conducted]'],
        section: 'Statutory_Compliance',
        userId: req.user.id 
    };
    //==================================WORK EQUIPMENT COMPLETED++++++++++++++++++++++++++++++++++
    payload['ladders'] = {
        step_ladders_assist_height_elevation: req.body['work_equipment[ladders][step_ladders_ assist_height_elevation]'],
        good_condition: req.body['work_equipment[ladders][good_condition]'],
        section: 'work_equipment',
        userId: req.user.id 
    };
    payload['handtools'] = {
        mechanical_tools_good_condition: req.body['work_equipment[handtools][mechanical_tools_good_condition]'],
        section: 'work_equipment',
        userId: req.user.id 
    };
    //===================================WElFARE COMPLETED=================================
    payload['welfare'] = {
        safety_signs_placed: req.body['welfare_facilities[Welfare][safety_signs_placed_differentiate_male_female_toilets]'],
        safety_signage_promoting: req.body['welfare_facilities[Welfare][safety_signage_promoting_personal_hygiene_toilet]'],
        workers_provided_cloak_rooms_lockers: req.body['welfare_facilities[Welfare][workers_provided_cloak-_rooms/lockers]'],
        toilets_good_usable_conditions: req.body['welfare_facilities[Welfare][toilets_good_usable_conditions]'],
        male_female_toilets_provided: req.body['welfare_facilities[Welfare][male_female_toilets_provided]'],
        descirbe_sign: req.body['welfare_facilities[Welfare][descirbe_sign]'],
        if_no_which_toilet: req.body['welfare_facilities[Welfare][if_no_which_toilet]'],
        section: 'welfare_facilities',
        userId: req.user.id 
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
        section: 'introduction',
        userId: req.user.id 
    };
    payload['executive_summary'] = {
        designated_handler: req.body['introduction[executive_summary][designated_handler]'],
        hse_personel_on_ground: req.body['introduction[executive_summary][hse_personel_on ground]'],
        safety_concern: req.body['introduction[executive_summary][safety_concern]'],
        state_policy: req.body['introduction[executive_summary][state_policy]'],
        fire_extinguishers: req.body['introduction[executive_summary][fire_extinguishers]'],
        section: 'introduction',
        userId: req.user.id 
    };
    //================================Administration Procedure COMPLETED=====================================================
    payload['management_review'] = {
        hse_meeting: req.body['Administration_Procedure[Management_Review][hse_meeting]'],
        evidence_discussed: req.body['Administration_Procedure[Management_Review][evidence_discussed]'],
        date_last_meeting: req.body['Administration_Procedure[Management_Review][date_last_meeting]'],
        other_comment: req.body['Administration_Procedure[Management_Review][other_comment]'],
        section: 'administration_procedure',
        userId: req.user.id 
    };
    payload['insurance'] = {
        when_paid_last: req.body['Administration_Procedure[Insurance][when_paid_last]'],
        other_comment: req.body['Administration_Procedure[Insurance][other_comment]'],
        evidence_workers_compensation: req.body['Administration_Procedure[Insurance][evidence_workers_compensation]'],
        evidence_building_occupancy_insurance: req.body['Administration_Procedure[Insurance][evidence_building_occupancy_insurance]'],
        section: 'administration_procedure',
        userId: req.user.id 
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
        section: 'administration_procedure',
        userId: req.user.id 
    };
    payload['safety_policy'] = {
        last_review_date: req.body['Administration_Procedure[Safety_Policy][last_review_date]'],
        staff_aware_safety_policy: req.body['Administration_Procedure[Safety_Policy][staff_aware_safety_policy]'],
        other_comment: req.body['Administration_Procedure[Safety_Policy][other_comment]'],
        safety_policy_sighted_around_branch: req.body['Administration_Procedure[Safety_Policy][safety_policy_sighted_around_branch]'],
        section: 'administration_procedure',
        userId: req.user.id 
    };
    payload['incident_accident'] = {
        request_hse_incident_log: req.body['Administration_Procedure[incident_accident][Request_HSE_incident_log]'],
        last_recorded_incident: req.body['Administration_Procedure[incident_accident][Last_recorded_incident]'],
        regulatory_agencies_occupational_incidents_accidents_reported_to: req.body['Administration_Procedure[incident_accident][regulatory_agencies_occupational_incidents/accidents_reported_to]'],
        other_comment: req.body['Administration_Procedure[incident_accident][other_comment]'],
        occupational_incident_accident: req.body['Administration_Procedure[incident_accident][occupational_incident/accident]'],
        section: 'administration_procedure',
        userId: req.user.id 
    };
    payload['waste_management'] = {
        name_lawma_contractor: req.body['Administration_Procedure[waste_management][name_lawma_contractor]'],
        frequently_waste_picked: req.body['Administration_Procedure[waste_management][frequently_waste_picked]'],
        other_comment: req.body['Administration_Procedure[waste_management][other_comment]'],
        lawma_approved_contractor_picks_waste: req.body['Administration_Procedure[waste_management][Lawma_approved_contractor_picks_waste]'],
        waste_segregation_practiced: req.body['Administration_Procedure[waste_management][waste_segregation_practiced]'],
        sight_waste_bins_around_premises: req.body['Administration_Procedure[waste_management][sight_waste_bins_around_premises]'],
        section: 'administration_procedure',
        userId: req.user.id 
    };
    payload['training'] = {
        training_topic: req.body['Administration_Procedure[Training][training_topic]'],
        other_comment: req.body['Administration_Procedure[Training][other_comment]'],
        safety_training_been_conducted_recently: req.body['Administration_Procedure[Training][safety_training_been_conducted_recently]'],
        training_attendance: req.body['Administration_Procedure[Training][training attendance]'],
        section: 'administration_procedure',
        userId: req.user.id 
    };
    payload['safe_system'] = {
        last_review_date: req.body['Administration_Procedure[safe_system][last_review_date]'],
        date_last_toolbox: req.body['Administration_Procedure[safe_system][date_last_toolbox]'],
        other_comment: req.body['Administration_Procedure[safe_system][other_comment]'],
        operational_safety_manual_informing_safe_practices_facility: req.body['Administration_Procedure[safe_system][operational_safety_manual_informing_safe_practices_facility]'],
        updated_safety_risk_assessment_facility: req.body['Administration_Procedure[safe_system][updated_safety_risk_assessment_facility]'],
        toolbox_conducted_facility_contractors: req.body['Administration_Procedure[safe_system][toolbox_conducted_facility_contractors]'],
        toolbox_talk_documented: req.body['Administration_Procedure[safe_system][toolbox_talk_documented]'],
        worker_chairs_tables_ergonomic_friendly: req.body['Administration_Procedure[safe_system][worker_chairs_tables_ergonomic_friendly]'],
        workers_computer_screen_excessively_bright: req.body['Administration_Procedure[safe_system][workers_computer_screen_excessively_bright]'],
        section: 'administration_procedure',
        userId: req.user.id 
    };
    payload['permit_work'] = {
        date_last_permit_work_issued: req.body['Administration_Procedure[permit_work][date_last_permit_work_issued]'],
        permit_to_work_process_contractor: req.body['Administration_Procedure[permit_work][permit_to_work_process_contractor]'],
        process_documented: req.body['Administration_Procedure[permit_work][process_documented]'],
        section: 'administration_procedure',
        userId: req.user.id 
    };
    payload['communication'] = {
        safety_communication_bank: req.body['Administration_Procedure[communication][safety_communication_bank]'],
        safety_communication_post: req.body['Administration_Procedure[communication][safety_communication_post]'],
        other_comment: req.body['Administration_Procedure[communication][other_comment]'],
        sight_evidence: req.body['Administration_Procedure[communication][sight_evidence]'],
        monthly_weekly_safety_tip_digest: req.body['Administration_Procedure[communication][monthly_weekly_safety_tip/digest]'],
        section: 'administration_procedure',
        userId: req.user.id 
    };
    payload['contractors_management'] = {
        cleaners_trained_conduct_first_aid: req.body['Administration_Procedure[contractors_management][cleaners_trained_conduct_first_aid]'],
        other_comment: req.body['Administration_Procedure[contractors_management][other_comment]'],
        sight_contractor_adequate_ppe_audit: req.body['Administration_Procedure[contractors_management][sight_contractor_adequate_PPE_audit]'],
        documented_contractor_safety_policy_place: req.body['Administration_Procedure[contractors_management][documented_contractor_safety_policy_place]'],
        section: 'administration_procedure',
        userId: req.user.id 
    };
    return payload;
}