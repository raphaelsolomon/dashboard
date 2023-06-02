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

exports.payloadAudit = (req, data) => {
    let payload = {};
    //=======================================ENVIRONMENTS===========================
    payload['gangways'] = {
        are_gang_way_free_from_obs: data['Environment[gangways][are_gang_way_free_from_obs]'],
        are_gang_way_free_from_obs_where: data['Environment[gangways][are_gang_way_free_from_obs_where]'],
        are_gang_way_properly_lit: data['Environment[gangways][are_gang_way_properly_lit]'],
        are_gang_way_properly_lit_where: data['Environment[gangways][are_gang_way_properly_lit_where]'],
        wide_enough_to_accomodate_flow_of_humans: data['Environment[gangways][wide_enough_to_accomodate_flow_of_humans]'],
        wide_enough_to_accomodate_flow_of_humans_where: data['Environment[gangways][wide_enough_to_accomodate_flow_of_humans_where]'],
        section: 'environment',
        userId: req.user.id 
    }
    payload['floors'] = {
        are_all_floors_even: data['Environment[floors][are_all_floors_even]'],
        did_you_sight_crack: data['Environment[floors][did_you_sight_crack]'],
        did_you_sight_crack_where: data['Environment[floors][did_you_sight_crack_where]'],
        section: 'environment',
        userId: req.user.id 
    }
    payload['lightening'] = {
        clear_and_visible_lightening_for_workers: data['Environment[lighting_general][clear_and_visible_lightening_for_workers]'],
        room_for_natural_lightening: data['Environment[lighting_general][room_for_natural_lightening]'],
        sight_faulty_bulbs: data['Environment[lighting_general][sight_faulty_bulbs]'],
        sight_faulty_bulbs_where: data['Environment[lighting_general][sight_faulty_bulbs_where]'],
        section: 'environment',
        userId: req.user.id 
    }
    payload['housekeeping'] = {
        general_house_keeping_of_the_bank: data['Environment[Housekeeping][general_house_keeping_of_the_bank]'],
        general_house_keeping_of_the_bank_where: data['Environment[Housekeeping][general_house_keeping_of_the_bank_where]'],
        items_stored_securely_in_right_place: data['Environment[Housekeeping][items_stored_securely_in_right_place]'],
        items_stored_securely_in_right_place_where: data['Environment[Housekeeping][items_stored_securely_in_right_place_where]'],
        signs_of_trailing_cable: data['Environment[Housekeeping][signs_of_trailing_cable]'],
        signs_of_trailing_cable_where: data['Environment[Housekeeping][signs_of_trailing_cable_where]'],
        other_comment: data['Environment[Housekeeping][other_comment]'],
        section: 'environment',
        userId: req.user.id 
    }
    payload['fire_precautions'] = {
        state: data['Environment[fire_precautions][state]'],
        section: 'environment',
        userId: req.user.id 
    }
    payload['stairs_staircases'] = {
        are_all_guardrails_present: data['Environment[stairs_staircases][are_all_guardrails_present]'],
        did_you_sight_any_faulty_guardrails: data['Environment[stairs_staircases][did_you_sight_any_faulty_guardrails]'],
        did_you_sight_any_faulty_guardrails_where: data['Environment[stairs_staircases][did_you_sight_any_faulty_guardrails_where]'],
        section: 'environment',
        userId: req.user.id 
    }
    payload['safety_signs'] = {
        installed_in_strategic_locations: data['Environment[safety_signs][installed_in_strategic_locations]'],
        signs_in_their_right_color_code: data['Environment[safety_signs][signs_in_their_right_color_code]'],
        are_there_any_sign_faded: data['Environment[safety_signs][are_there_any_sign_faded]'],
        section: 'environment',
        userId: req.user.id 
    }
    payload['temperature'] = {
        temp_well_regulated: data['Environment[temperature][temp_well_regulated]'],
        expose_to_extreme_cold: data['Environment[temperature][expose_to_extreme_cold]'],
        expose_to_extreme_cold_where: data['Environment[temperature][expose_to_extreme_cold_where]'],
        expose_to_extreme_heat: data['Environment[temperature][expose_to_extreme_heat]'],
        expose_to_extreme_heat_where: data['Environment[temperature][expose_to_extreme_heat_where]'],
        section: 'environment',
        userId: req.user.id 
    }
    payload['access_exit'] = {
        access_door_free_from_obs: data['Environment[access_exit][access_door_free_from_obs]'],
        exit_door_free_from_obs: data['Environment[access_exit][exit_door_free_from_obs]'],
        are_safety_sign_placed_at_access_door: data['Environment[access_exit][are_safety_sign_placed_at_access_door]'],
        are_safety_sign_placed_at_exit_door: data['Environment[access_exit][are_safety_sign_placed_at_exit_door]'],
        section: 'environment',
        userId: req.user.id 
    }
     //=======================================IMAGES================================
     payload['images'] = {
        poor_house_keeping: data['paths[poor_house_keeping]'],
        trailing_cable: data['paths[trailing_cable]'],
        fire_fighting_equipment: data['paths[fire_fighting_equipment]'],
        waste_area: data['paths[waste_area]'],
        stairs_and_staircase: data['paths[stairs_and_staircase]'],
        safety_signs: data['paths[safety_signs]'],
        workstations: data['paths[workstations]'],
        toilets: data['paths[toilets]'],
        lighting: data['paths[lighting]'],
        muster_point: data['paths[muster_point]'],
        hazard_spotted: data['paths[hazard_spotted]'],
        generator_area: data['paths[generator_area]'],
        front_of_the_bank: data['paths[front_of_the_bank]'],
        section: 'images',
        userId: req.user.id 
     }
     //=======================================SATUTORY COMPLIANCE================================
     payload['electricity'] = {
        where_not_locked: data['Statutory_Compliance[Electricity][where_not_locked]'],
        if_sighted: data['Statutory_Compliance[Electricity][if_sighted]'],
        if_sighted1: data['Statutory_Compliance[Electricity][if_sighted1]'],
        if_sighted2: data['Statutory_Compliance[Electricity][if_sighted2]'],
        last_review_date_fire_risk_assessment: data['Statutory_Compliance[Electricity][last_review_date_fire_risk_assessment]'],
        electrical_distribution_boxes_securely_locked: data['Statutory_Compliance[Electricity][electrical_distribution_boxes_securely_locked]'],
        sight_any_trailing_cables: data['Statutory_Compliance[Electricity][sight_any_trailing_cables]'],
        sight_any_exposed_naked_wires: data['Statutory_Compliance[Electricity][sight_any_exposed_naked_wires]'],
        faulty_sockets_switches: data['Statutory_Compliance[Electricity][faulty_sockets_switches]'],
        fire_risk_assessment: data['Statutory_Compliance[Electricity][fire_risk_assessment]'],
        procedure_monitoring_electrical_appliances: data['Statutory_Compliance[Electricity][procedure_monitoring_electrical_appliances]'],
        section: 'Statutory_Compliance',
        userId: req.user.id 
    };
    payload['first_safety'] = {
        free_obstruction: data['Statutory_Compliance[free_obstruction][free_obstruction]'],
        fire_extinguishers_hung_wall: data['Statutory_Compliance[free_obstruction][fire_extinguishers_hung_wall]'],
        other_fire_fighting_equipment_installed: data['Statutory_Compliance[free_obstruction][other_fire-fighting_equipment_installed]'],
        fire_service_certificate: data['Statutory_Compliance[free_obstruction][fire_service_certificate]'],
        fire_equipment: data['Statutory_Compliance[free_obstruction][fire_equipment]'],
        classes_fire_extinguishers: data['Statutory_Compliance[free_obstruction][classes_fire_extinguishers]'],
        fire_extinguishers_present: data['Statutory_Compliance[free_obstruction][fire_extinguishers_present]'],
        where_fire_extinguisher_obstructed: data['Statutory_Compliance[free_obstruction][where_fire_extinguisher_obstructed]'],
        where_placed_floor: data['Statutory_Compliance[free_obstruction][where_placed_floor]'],
        fire_extinguishers_serviced_last: data['Statutory_Compliance[free_obstruction][fire_extinguishers_serviced_last]'],
        expiring_date_fire_extinguishers: data['Statutory_Compliance[free_obstruction][expiring_date_fire_extinguishers]'],
        section: 'Statutory_Compliance',
        userId: req.user.id 
    };
    payload['first_aid'] = {
        issued_first_aid_treatment: data['Statutory_Compliance[first_aid][issued_first-aid_treatment]'],
        other_first_aid_equipment: data['Statutory_Compliance[first_aid][other_first-aid_equipment]'],
        expired_item_first_aid_box: data['Statutory_Compliance[first_aid][expired_item_first_aid_box]'],
        sufficient_facility: data['Statutory_Compliance[first_aid][sufficient_facility]'],
        last_recorded_first_box: data['Statutory_Compliance[first_aid][last_recorded_first_box?]'],
        section: 'Statutory_Compliance',
        userId: req.user.id 
    };
    payload['lifting_operations'] = {
        lifting_equipment_provided: data['Statutory_Compliance[lifting_operations][lifting_equipment_provided]'],
        sight_any_lifting_equipment: data['Statutory_Compliance[lifting_operations][sight_any_lifting_equipment]'],
        section: 'Statutory_Compliance',
        userId: req.user.id 
    };
    payload['reporting_injuries'] = {
        date_reported_incident: data['Statutory_Compliance[reporting_injuries][Date_reported_incident]'],
        reporting_injuries_regulatory_body: data['Statutory_Compliance[reporting_injuries][reporting_injuries_regulatory_body]'],
        section: 'Statutory_Compliance',
        userId: req.user.id 
    };
    payload['control_substance'] = {
        harmful_sub_stored_in_facility: data['Statutory_Compliance[hazardous_to_health][harmful_sub_stored_in_facility]'],
        cleaning_item_stored_safely_within: data['Statutory_Compliance[hazardous_to_health][cleaning_item_stored_safely_within]'],
        did_cleaner_use_personal_protective_equip: data['Statutory_Compliance[hazardous_to_health][did_cleaner_use_personal_protective_equip]'],
        generator_free_of_oil_spillage: data['Statutory_Compliance[hazardous_to_health][generator_free_of_oil_spillage]'],
        fucmigation_conducted: data['Statutory_Compliance[hazardous_to_health][fucmigation_conducted]'],
        section: 'Statutory_Compliance',
        userId: req.user.id 
    };

    payload['display_monitor'] = {
        monitor_screens_brightness_moderate: data['Statutory_Compliance[display_screen_equipment][monitor_screens_brightness_moderate]'],
        yes_how_frequently: data['Statutory_Compliance[display_screen_equipment][yes_how_frequently]'],
        eye_checks_conducted: data['Statutory_Compliance[display_screen_equipment][eye_checks_conducted]'],
        section: 'Statutory_Compliance',
        userId: req.user.id 
    };
    //==================================WORK EQUIPMENT COMPLETED++++++++++++++++++++++++++++++++++
    payload['ladders'] = {
        step_ladders_assist_height_elevation: data['work_equipment[ladders][step_ladders_ assist_height_elevation]'],
        good_condition: data['work_equipment[ladders][good_condition]'],
        section: 'work_equipment',
        userId: req.user.id 
    };
    payload['handtools'] = {
        mechanical_tools_good_condition: data['work_equipment[handtools][mechanical_tools_good_condition]'],
        section: 'work_equipment',
        userId: req.user.id 
    };
    //===================================WElFARE COMPLETED=================================
    payload['welfare'] = {
        safety_signs_placed: data.welfare_facilities.Welfare.safety_signs_placed_differentiate_male_female_toilets,
        safety_signage_promoting: data.welfare_facilities.Welfare.safety_signage_promoting_personal_hygiene_toilet,
        workers_provided_cloak_rooms_lockers: data.welfare_facilities.Welfare.workers_provided_cloak-_rooms/lockers,
        toilets_good_usable_conditions: data.welfare_facilities.Welfare.toilets_good_usable_conditions,
        male_female_toilets_provided: data.welfare_facilities.Welfare.male_female_toilets_provided,
        descirbe_sign: data['welfare_facilities[Welfare][descirbe_sign]'],
        if_no_which_toilet: data['welfare_facilities[Welfare][if_no_which_toilet]'],
        section: 'welfare_facilities',
        userId: req.user.id 
    };
    //================================INTRODUCTION COMPLETED=====================================================
    payload['bank_audit'] = {
        date_safety_audit: data.introduction.bank_audit.Date_safety_audit,
        safety_audit_report_for: data.introduction.bank_audit.Safety_audit_report_for,
        bank_full_address: data.introduction.bank_audit.bank_full_address,
        name_safety_audit_1: data.introduction.bank_audit.name_safety_audit_1,
        name_safety_audit_2: data.introduction.bank_audit.name_safety_audit_2,
        name_bank_assessment_participant: data.introduction.bank_audit.name_bank_assessment_participant,
        position_bank_assessment_participant: data.introduction.bank_audit.position_bank_assessment_participant,
        section: 'introduction',
        userId: req.user.id 
    };
    payload['executive_summary'] = {
        designated_handler: data['introduction[executive_summary][designated_handler]'],
        hse_personel_on_ground: data['introduction[executive_summary][hse_personel_on ground]'],
        safety_concern: data['introduction[executive_summary][safety_concern]'],
        state_policy: data['introduction[executive_summary][state_policy]'],
        fire_extinguishers: data['introduction[executive_summary][fire_extinguishers]'],
        section: 'introduction',
        userId: req.user.id 
    };
    //================================Administration Procedure COMPLETED=====================================================
    payload['management_review'] = {
        hse_meeting: data['Administration_Procedure[Management_Review][hse_meeting]'],
        evidence_discussed: data['Administration_Procedure[Management_Review][evidence_discussed]'],
        date_last_meeting: data['Administration_Procedure[Management_Review][date_last_meeting]'],
        other_comment: data['Administration_Procedure[Management_Review][other_comment]'],
        section: 'administration_procedure',
        userId: req.user.id 
    };
    payload['insurance'] = {
        when_paid_last: data['Administration_Procedure[Insurance][when_paid_last]'],
        other_comment: data['Administration_Procedure[Insurance][other_comment]'],
        evidence_workers_compensation: data['Administration_Procedure[Insurance][evidence_workers_compensation]'],
        evidence_building_occupancy_insurance: data['Administration_Procedure[Insurance][evidence_building_occupancy_insurance]'],
        when_paid_last_insurance: data['Administration_Procedure[Insurance][when_paid_last_insurance]'],
        section: 'administration_procedure',
        userId: req.user.id 
    };
    payload['emergency_procedure'] = {
        last_review_date: data['Administration_Procedure[Emergency_Procedure][last_review_date]'],
        date_emergency_drill: data['Administration_Procedure[Emergency_Procedure][Date_emergency_drill]'],
        name_hospital: data['Administration_Procedure[Emergency_Procedure][Name_Hospital]'],
        other_comment: data['Administration_Procedure[Emergency_Procedure][other_comment]'],
        evidence_documented_emergency_response_plan: data['Administration_Procedure[Emergency_Procedure][evidence_documented_emergency_response_plan]'],
        emergency_drill_been_conducted_lately: data['Administration_Procedure[Emergency_Procedure][emergency_drill_been_conducted_lately]'],
        evidence_appointed_fire_wardens: data['Administration_Procedure[Emergency_Procedure][evidence_appointed_fire_wardens]'],
        registered_retainers_hospital_branch: data['Administration_Procedure[Emergency_Procedure][registered_retainers_hospital_branch]'],
        section: 'administration_procedure',
        userId: req.user.id 
    };
    payload['safety_policy'] = {
        last_review_date: data['Administration_Procedure[Safety_Policy][last_review_date]'],
        staff_aware_safety_policy: data['Administration_Procedure[Safety_Policy][staff_aware_safety_policy]'],
        other_comment: data['Administration_Procedure[Safety_Policy][other_comment]'],
        safety_policy_sighted_around_branch: data['Administration_Procedure[Safety_Policy][safety_policy_sighted_around_branch]'],
        section: 'administration_procedure',
        userId: req.user.id 
    };
    payload['incident_accident'] = {
        request_hse_incident_log: data['Administration_Procedure[incident_accident][Request_HSE_incident_log]'],
        last_recorded_incident: data['Administration_Procedure[incident_accident][Last_recorded_incident]'],
        regulatory_agencies_occupational_incidents_accidents_reported_to: data['Administration_Procedure[incident_accident][regulatory_agencies_occupational_incidents/accidents_reported_to]'],
        other_comment: data['Administration_Procedure[incident_accident][other_comment]'],
        occupational_incident_accident: data['Administration_Procedure[incident_accident][occupational_incident/accident]'],
        section: 'administration_procedure',
        userId: req.user.id 
    };
    payload['waste_management'] = {
        name_lawma_contractor: data['Administration_Procedure[waste_management][name_lawma_contractor]'],
        frequently_waste_picked: data['Administration_Procedure[waste_management][frequently_waste_picked]'],
        other_comment: data['Administration_Procedure[waste_management][other_comment]'],
        lawma_approved_contractor_picks_waste: data['Administration_Procedure[waste_management][Lawma_approved_contractor_picks_waste]'],
        waste_segregation_practiced: data['Administration_Procedure[waste_management][waste_segregation_practiced]'],
        sight_waste_bins_around_premises: data['Administration_Procedure[waste_management][sight_waste_bins_around_premises]'],
        section: 'administration_procedure',
        userId: req.user.id 
    };
    payload['training'] = {
        training_topic: data['Administration_Procedure[Training][training_topic]'],
        other_comment: data['Administration_Procedure[Training][other_comment]'],
        safety_training_been_conducted_recently: data['Administration_Procedure[Training][safety_training_been_conducted_recently]'],
        documented: data['Administration_Procedure[Training][documented]'],
        training_attendance: data['Administration_Procedure[Training][training attendance]'],
        section: 'administration_procedure',
        userId: req.user.id 
    };
    payload['safe_system'] = {
        last_review_date: data['Administration_Procedure[safe_system][last_review_date]'],
        date_last_toolbox: data['Administration_Procedure[safe_system][date_last_toolbox]'],
        other_comment: data['Administration_Procedure[safe_system][other_comment]'],
        operational_safety_manual_informing_safe_practices_facility: data['Administration_Procedure[safe_system][operational_safety_manual_informing_safe_practices_facility]'],
        updated_safety_risk_assessment_facility: data['Administration_Procedure[safe_system][updated_safety_risk_assessment_facility]'],
        toolbox_conducted_facility_contractors: data['Administration_Procedure[safe_system][toolbox_conducted_facility_contractors]'],
        toolbox_talk_documented: data['Administration_Procedure[safe_system][toolbox_talk_documented]'],
        worker_chairs_tables_ergonomic_friendly: data['Administration_Procedure[safe_system][worker_chairs_tables_ergonomic_friendly]'],
        workers_computer_screen_excessively_bright: data['Administration_Procedure[safe_system][workers_computer_screen_excessively_bright]'],
        section: 'administration_procedure',
        userId: req.user.id 
    };
    payload['permit_work'] = {
        date_last_permit_work_issued: data['Administration_Procedure[permit_work][date_last_permit_work_issued]'],
        permit_to_work_process_contractor: data['Administration_Procedure[permit_work][permit_to_work_process_contractor]'],
        process_documented: data['Administration_Procedure[permit_work][process_documented]'],
        section: 'administration_procedure',
        userId: req.user.id 
    };
    payload['communication'] = {
        safety_communication_bank: data['Administration_Procedure[communication][safety_communication_bank]'],
        safety_communication_post: data['Administration_Procedure[communication][safety_communication_post]'],
        other_comment: data['Administration_Procedure[communication][other_comment]'],
        sight_evidence: data['Administration_Procedure[communication][sight_evidence]'],
        monthly_weekly_safety_tip_digest: data['Administration_Procedure[communication][monthly_weekly_safety_tip/digest]'],
        section: 'administration_procedure',
        userId: req.user.id 
    };
    payload['contractors_management'] = {
        cleaners_trained_conduct_first_aid: data['Administration_Procedure[contractors_management][cleaners_trained_conduct_first_aid]'],
        other_comment: data['Administration_Procedure[contractors_management][other_comment]'],
        sight_contractor_adequate_ppe_audit: data['Administration_Procedure[contractors_management][sight_contractor_adequate_PPE_audit]'],
        documented_contractor_safety_policy_place: data['Administration_Procedure[contractors_management][documented_contractor_safety_policy_place]'],
        section: 'administration_procedure',
        userId: req.user.id 
    };
    return payload;
}