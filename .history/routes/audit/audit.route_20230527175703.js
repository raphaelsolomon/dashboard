const express = require("express");
const route = express.Router();
let payload  = {};

route.get('/', async (req, res) => {
    res.status(200).render('../audit/index', { alert: [] });
});

route.post('/', async (req, res) => {
    payload['Welfare'] = {
        safety_signs_placed_differentiate_male_female_toilets: req.body['welfare_facilities[Welfare][safety_signs_placed_differentiate_male_female_toilets]'],
        safety_signage_promoting_personal_hygiene_toilet: req.body['welfare_facilities[Welfare][safety_signage_promoting_personal_hygiene_toilet]'],
        workers_provided_cloak_rooms_lockers: req.body['welfare_facilities[Welfare][workers_provided_cloak-_rooms/lockers]'],
        toilets_good_usable_conditions: req.body['welfare_facilities[Welfare][toilets_good_usable_conditions]'],
        male_female_toilets_provided: req.body['welfare_facilities[Welfare][male_female_toilets_provided]'],
        descirbe_sign: req.body['welfare_facilities[Welfare][descirbe_sign]'],
        if_no_which_toilet: req.body['welfare_facilities[Welfare][if_no_which_toilet]'],
    };
    payload['Electricity'] = {
        where_not_locked: req.body['welfare_facilities[Welfare][safety_signs_placed_differentiate_male_female_toilets]'],
        if_sighted: req.body['welfare_facilities[Welfare][safety_signage_promoting_personal_hygiene_toilet]'],
        if_sighted1: req.body['welfare_facilities[Welfare][workers_provided_cloak-_rooms/lockers]'],
        if_sighted2: req.body['welfare_facilities[Welfare][toilets_good_usable_conditions]'],
        last_review_date_fire_risk_assessment: req.body['welfare_facilities[Welfare][male_female_toilets_provided]'],
        electrical_distribution_boxes_securely_locked: req.body['welfare_facilities[Welfare][descirbe_sign]'],
        sight_any_trailing_cables: req.body['welfare_facilities[Welfare][if_no_which_toilet]'],

        sight_any_exposed_naked_wires: req.body['welfare_facilities[Welfare][toilets_good_usable_conditions]'],
        faulty_sockets_switches: req.body['welfare_facilities[Welfare][male_female_toilets_provided]'],
        electrical_distribution_boxes_securely_locked: req.body['welfare_facilities[Welfare][descirbe_sign]'],
        sight_any_trailing_cables: req.body['welfare_facilities[Welfare][if_no_which_toilet]'],
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