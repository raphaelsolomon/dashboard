const express = require("express");
const Health = require("../../model/health/health.model");
const route = express.Router();

route.get('/', (req, res) => {
    res.status(200).render('../health/index')
});

route.post('/', (req, res) => {
    return Health.create()
    res.status(200).render('../health/index')
});




module.exports = route;