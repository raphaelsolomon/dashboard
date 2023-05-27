const express = require("express");
const route = express.Router();

route.get('/', async (req, res) => {
    res.status(200).render('../audit/index', { alert: [] });
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
    res.status(200).render('../audit/section2', { alert: [] });
});
route.get('/section3', async (req, res) => {
    res.status(200).render('../audit/section3', { alert: [] });
});
route.get('/section4', async (req, res) => {
    res.status(200).render('../audit/section4', { alert: [] });
});
route.get('/section5', async (req, res) => {
    res.status(200).render('../audit/section5', { alert: [] });
});
route.get('/section6', async (req, res) => {
    res.status(200).render('../audit/section6', { alert: [] });
});
route.get('/preview', async (req, res) => {
    res.status(200).render('../audit/preview', { alert: [] });
});

module.exports = route;