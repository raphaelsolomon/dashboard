const express = require("express");
const route = express.Router();

route.get('/', async (req, res) => {
    res.status(200).render('../audit/index', { alert: [] });
});

route.get('/introduction', async (req, res) => {
    res.status(200).render('../audit/introduction', { alert: [] });
});

route.get('/introduction', async (req, res) => {
    res.status(200).render('../audit/introduction', { alert: [] });
});
route.get('/section1', async (req, res) => {
    res.status(200).render('../audit/introduction', { alert: [] });
});
route.get('/section2', async (req, res) => {
    res.status(200).render('../audit/introduction', { alert: [] });
});
route.get('/section3', async (req, res) => {
    res.status(200).render('../audit/introduction', { alert: [] });
});
route.get('/section4', async (req, res) => {
    res.status(200).render('../audit/introduction', { alert: [] });
});
route.get('/section5', async (req, res) => {
    res.status(200).render('../audit/introduction', { alert: [] });
});
route.get('/section6', async (req, res) => {
    res.status(200).render('../audit/introduction', { alert: [] });
});

module.exports = route;