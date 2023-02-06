const express = require("express");
const Health = require("../../model/health/health.model");
const route = express.Router();

route.get('/', (req, res) => {
    res.status(200).render('../health/index')
});

route.post('/', (req, res) => {
    const msg = [];
    msg.push({ msg: "Record Successfully Updated", err: false });
    return Health.create(req.body).then((_) => res.status(200).render('../health/index', {alert: msg})).catch((err) => {
        msg[0] = { msg: `Unable to insert record ${err}`, err: true };
        return res.status(500).render('../health/index', { alert: msg })
    });

});




module.exports = route;