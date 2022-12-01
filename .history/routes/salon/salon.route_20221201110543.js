const express = require("express");
const route = express.Router();
const Saloon = require("../../model/salon/salon.model");

route.get('/', (req, res) => {
    res.status(200).render('../salon/index', { alert: [] });
});

route.post('/submit', (req, res) => {
    Saloon.create(req.body).then(() => {
        const msg = [];
        msg.push({msg: 'Salon successfully submitted!', a});
        res.status(200).render('../salon/index', { alert: msg });
    })
});


module.exports = route;