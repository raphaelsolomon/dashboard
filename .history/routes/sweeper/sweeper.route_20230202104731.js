const express = require("express");
const Sweeper = require("../../model/sweepers/sweeper.model");
const route = express.Router();

route.get('/', (req, res) => {
    res.status(200).render('../sweepers/index')
});

route.post('/', (req, res) => {
    return Sweeper.create(req.body).then((_) => res.status(200).redirect('//survey/sweeper')).catch((err) => {
        res.status(500).json('Error: ' + err.message)
    });
    
});




module.exports = route;