const express = require("express");
const Fort = require("../model/fort.model copy");
const route = express.Router();

route.get('/', async (req, res) => {
    return res.status(200).render('../fort/index');
})

route.post('/submit', async (req, res) => {
    return Fort.create(req.body).then((_) => {
        ret
    })
    return res.status(200).json('../fort/index');
})
module.exports = route;  