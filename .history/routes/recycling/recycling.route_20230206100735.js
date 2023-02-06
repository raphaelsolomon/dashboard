const express = require("express");
const Recycling = require("../../model/recycling/recycling.model");
const route = express.Router();

route.get('/', (req, res) => {
    res.status(200).render('../recycling/index')
});

route.post('/', (req, res) => {
    const msg = [];
    msg.push({ msg: "Record Successfully Updated", err: false });
    return Recycling.create(req.body).then((_) => res.status(200).render('../recycling/index', {alert})).catch((err) => {
        res.status(500).json('Error: ' + err.message)
    });
    
});




module.exports = route;