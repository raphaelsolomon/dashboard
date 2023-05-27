const express = require("express");
const route = express.Router();
let payload  = {};

route.get('/', async (req, res) => {
    res.status(200).render('../audit/index', { alert: [] });
});

route.post('/', async (req, res) => {
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
        fire_equipment: req.body['Statutory_Compliance[free_obstruction][free_obstruction]'],
        free_obstruction: req.body['Statutory_Compliance[free_obstruction][free_obstruction]'],
        free_obstruction: req.body['Statutory_Compliance[free_obstruction][free_obstruction]'],
        free_obstruction: req.body['Statutory_Compliance[free_obstruction][free_obstruction]'],
        free_obstruction: req.body['Statutory_Compliance[free_obstruction][free_obstruction]'],
        free_obstruction: req.body['Statutory_Compliance[free_obstruction][free_obstruction]'],
        free_obstruction: req.body['Statutory_Compliance[free_obstruction][free_obstruction]'],
        section: 'Statutory_Compliance'
    };

    payload['lifting_operations'] = {
        lifting_equipment_provided: req.body['Statutory_Compliance[lifting_operations][lifting_equipment_provided]'],
        sight_any_lifting_equipment: req.body['Statutory_Compliance[lifting_operations][sight_any_lifting_equipment]'],
        section: 'Statutory_Compliance'
    };

    payload['control_substances'] = {
        monitor_screens_brightness_moderate: req.body['Statutory_Compliance[control_substances][monitor_screens_brightness_moderate]'],
        yes_how_frequently: req.body['Statutory_Compliance[control_substances][yes_how_frequently]'],
        eye_checks_conducted: req.body['Statutory_Compliance[control_substances][eye_checks_conducted]'],
        section: 'Statutory_Compliance'
    };

    payload['ladders'] = {
        step_ladders_assist_height_elevation: req.body['work_equipment[ladders][step_ladders_ assist_height_elevation]'],
        good_condition: req.body['work_equipment[ladders][good_condition]'],
        section: 'work_equipment'
    };

    payload['handtools'] = {
        mechanical_tools_good_condition: req.body['work_equipment[handtools][mechanical_tools_good_condition]'],
        section: 'work_equipment'
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