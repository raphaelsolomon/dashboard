const express = require("express");
const Vulcanizer = require("../../model/vulcanizer/vulcanizer.model");
const route = express.Router();

route.get('/', (req, res) => {
    res.status(200).render('../vulcanizer/vulcanizer');
})

route.post('/', (req, res) => {
    Vulcanizer.create(req.body).then((vulcanizer) => 
    res.status(200).render('../vulcanizer/vulcanizer')).then
})

route.get('/users', (req, res) => {
    res.status(200).render('../vulcanizer/vulcanizer_users');
})

route.post('/users', (req, res) => {
    res.status(200).render('../vulcanizer/vulcanizer_users');
})

module.exports = route;