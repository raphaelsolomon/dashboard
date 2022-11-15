const express = require("express");
const route = express.Router();

route.get('/', async (req, res) => {
    return res.status(200).render('../fort/index');
})

route.post('/submit', (req, res) => {
    console.log()
    return res.status(200).json('../fort/index');
})
module.exports = route;  