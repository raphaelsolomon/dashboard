const express = require("express");
const route = express.Router();

route.get('/', (req, res) => {
    res.status(200).render('../health/index')
});

module.exports = route;