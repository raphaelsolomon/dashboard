const express = require("express");
const route = express.Router();

route.get('/', async (req, res) => {
    return res.status(200).render('../fort/index');
})

route.post('/submit', async (req, res, next) => {
    console.log(req.body)
})
module.exports = route;  