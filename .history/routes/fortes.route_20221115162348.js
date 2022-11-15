const express = require("express");
const route = express.Router();

route.get('/', async (req, res, next) => {
    return res.status(200).render('../index');
})

route.post('/submit', async (req, res, next) => {
    console.log(req.body)
    return res.status(200).render('../index');
})
module.exports = route;  