const express = require("express");
const route = express.Router();

route.get('/', async (req, res) => {
    res.status(200).render('../delivery/index', { alert: [] });
});

module.exports = route;