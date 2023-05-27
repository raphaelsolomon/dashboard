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
route.get('/introduction', async (req, res) => {
    res.status(200).render('../audit/introduction', { alert: [] });
});
route.get('/introduction', async (req, res) => {
    res.status(200).render('../audit/introduction', { alert: [] });
});
route.get('/introduction', async (req, res) => {
    res.status(200).render('../audit/introduction', { alert: [] });
});
route.get('/introduction', async (req, res) => {
    res.status(200).render('../audit/introduction', { alert: [] });
});
route.get('/introduction', async (req, res) => {
    res.status(200).render('../audit/introduction', { alert: [] });
});

module.exports = route;