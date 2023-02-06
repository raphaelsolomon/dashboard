const express = require("express");
const Health = require("../../model/health/health.model");
const route = express.Router();

route.get('/', (req, res) => {
    res.status(200).render('../health/index')
});

route.post('/', (req, res) => {
    return Health.create(req.body).then((_) => res.status(200).redirect('/survey/health')).catch((err) => {
        msg[0] = { msg: `Unable to insert record ${err}`, err: true };
        res.status(500).json('Error: ' + err.message)
    });
    
});




module.exports = route;