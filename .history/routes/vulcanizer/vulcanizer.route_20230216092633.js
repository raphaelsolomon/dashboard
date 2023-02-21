const express = require("express");
const route = express.Router();

route.get('/', (req, res) => {
    res.status.render('../vulcanizer/vulcanizer')
})

module.exports = route;