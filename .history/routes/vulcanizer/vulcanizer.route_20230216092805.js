const express = require("express");
const route = express.Router();

route.get('/', (req, res) => {
    res.status(200).render('../vulcanizer/vulcanizer');
})

route.get('/users', (req, res) => {
    res.status(200).render('../vulcanizer/vulcanizer');
})

module.exports = route;