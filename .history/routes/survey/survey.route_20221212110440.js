const express = require("express");
const route = express.Router();

route.get('/', (req, res) => {
    return res.status(200)
})

module.exports = route;