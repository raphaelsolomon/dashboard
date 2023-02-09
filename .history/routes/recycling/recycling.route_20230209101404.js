const express = require("express");
const Recycling = require("../../model/recycling/recycling.model");
const route = express.Router();

route.get('/', (req, res) => {
    res.status(200).render('../recycling/index', { alert: [] })
});

route.post('/', (req, res) => {
    const msg = [];
    msg.push({ msg: "Record Successfully Updated", err: false });
    return Recycling.create(req.body).then((_) => res.status(200).render('../recycling/index', { alert: msg })).catch((err) => {
        msg[0] = { msg: `Unable to insert record ${err}`, err: true }
        return res.status(500).render('../recycling/index', { alert: msg });
    });
});

route.get('/table', (req, res) => {
    return Recycling.findAll().then((reult) => res.status(200).render('../recycling/table', { alert: [], input: result }));
}); 

module.exports = route;