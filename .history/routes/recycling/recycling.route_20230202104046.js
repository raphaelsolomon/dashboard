const express = require("express");
const Recycling = require("../../model/r/health.model");
const route = express.Router();

route.get('/', (req, res) => {
    res.status(200).render('../recycling/index')
});

route.post('/', (req, res) => {
    return Health.create(req.body).then((_) => res.status(200).redirect('/survey/recycling')).catch((err) => {
        res.status(500).json('Error: ' + err.message)
    });
    
});




module.exports = route;