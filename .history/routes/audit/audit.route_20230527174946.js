const express = require("express");
const route = express.Router();
let payload  = {};

route.get('/', async (req, res) => {
    res.status(200).render('../audit/index', { alert: [] });
});

route.post('/', async (req, res) => {
    payload['Welfare'] = {
        
    }
    console.log(req.body['welfare_facilities[Welfare][workers_provided_cloak-_rooms/lockers]']);
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