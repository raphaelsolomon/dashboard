const express = require("express");
const Sweeper = require("../../model/sweepers/sweeper.model");
const route = express.Router();

route.get('/', (req, res) => {
    res.status(200).render('../sweepers/index', { alert: [] })
});

route.post('/', (req, res) => {
    const msg = [];
    msg.push({ msg: "Record Successfully Iner", err: false });
    return Sweeper.create(req.body).then((_) => res.status(200).render('../sweepers/index', { alert: msg })).catch((err) => {
        msg[0] = { msg: `Unable to insert record ${err}`, err: true }
        res.status(500).render('../sweepers/index', { alert: msg });
    });

});

module.exports = route;