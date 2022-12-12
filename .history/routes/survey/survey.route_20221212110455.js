const express = require("express");
const route = express.Router();

route.get('/', (req, res) => {
    return res.status(200).render('')
})

module.exports = route;