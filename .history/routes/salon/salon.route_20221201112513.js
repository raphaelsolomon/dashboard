const express = require("express");
const route = express.Router();
const Saloon = require("../../model/salon/salon.model");

route.get('/', (req, res) => {
    res.status(200).render('../salon/index', { alert: [] });
});

route.post('/submit', (req, res) => {
    return Saloon.create(req.body).then(() => {
        const msg = [];
        msg.push({ msg: "Record Successfully Inserted", err: false });
       return  res.status(200).render('../salon/index', { alert: msg });
    }).catch((err) => {
        const msg = [];
        msg.push({ msg: `Unable to insert record ${err}`, err: true });
        return res.status(500).render('../salon/index', { alert: msg });
    });
});

route.get('/table', async (req, res) => {
    const salon = await Saloon.fin
    res.status(200).render('../salon/table', { input: });
});


module.exports = route;