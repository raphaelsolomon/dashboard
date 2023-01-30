const express = require("express");
const Health = require("../../model/health/health.model");
const route = express.Router();

route.get('/', (req, res) => {
    res.status(200).render('../sweepers/index')
});

route.post('/survey/', (req, res) => {
    return Health.create(req.body).then((_) => res.status(200).redirect('/health')).catch((err) => {
        res.status(500).json('Error: ' + err.message)
    });
    
});




module.exports = route;