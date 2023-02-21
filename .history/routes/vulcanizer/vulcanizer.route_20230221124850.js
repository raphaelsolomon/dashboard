const express = require("express");
const Vulcanizer = require("../../model/vulcanizer/vulcanizer.model");
const route = express.Router();

route.get('/', (req, res) => {
    res.status(200).render('../vulcanizer/vulcanizer');
})

route.post('/', (req, res) => {
    const msg = [];
    msg.push({ msg: "Record Successfully ", err: false });
    return Vulcanizer.create(req.body).then((vulcanizer) =>
        res.status(200).render('../vulcanizer/vulcanizer', { alert: msg })).then((err) => console.log(err));
})

route.get('/users', (req, res) => {
    res.status(200).render('../vulcanizer/vulcanizer_users');
})

route.post('/users', (req, res) => {
    res.status(200).render('../vulcanizer/vulcanizer_users');
})

module.exports = route;