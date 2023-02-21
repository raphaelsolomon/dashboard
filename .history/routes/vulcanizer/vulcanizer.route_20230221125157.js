const express = require("express");
const Vulcanizer = require("../../model/vulcanizer/vulcanizer.model");
const Vulcanizer_users = require("../../model/vulcanizer/vulcanizer.user.model");
const route = express.Router();

route.get('/', (req, res) => {
    res.status(200).render('../vulcanizer/vulcanizer');
})

route.post('/', (req, res) => {
    const msg = [];
    msg.push({ msg: "Record Successfully Inserted", err: false });
    return Vulcanizer.create(req.body).then((vulcanizer) =>
        res.status(200).render('../vulcanizer/vulcanizer', { alert: msg })).then((err) => console.log(err));
})

route.get('/users', (req, res) => {
    res.status(200).render('../vulcanizer/vulcanizer_users');
})

route.post('/users', (req, res) => {
    Vulcanizer_users.create(req.body).then((vulcanizer) =>
    res.status(200).render('../vulcanizer/vulcanizer_users');
})

module.exports = route;