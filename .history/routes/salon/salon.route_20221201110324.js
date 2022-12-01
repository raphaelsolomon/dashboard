const express = require("express");
const route = express.Router();
const Saloon = require("../../");

route.get('/', (req, res) => {
    res.status(200).render('../salon/index', {});
});

route.post('/submit', (req, res) => {
    Saloo
});


module.exports = route;