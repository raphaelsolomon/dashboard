const express = require("express");
const Fort = require("../model/fort.model copy");
const route = express.Router();

route.get('/', async (req, res) => {
    return res.status(200).render('../fort/index');
})

route.post('/submit', async (req, res) => {
    return Fort.create(req.body).then((_) => {
        return res.status(200).json('succesfully submitted...'); 
    }).catch((err) => res.status(200).json('error occurred when submitting...'));
})


module.exports = route;  
