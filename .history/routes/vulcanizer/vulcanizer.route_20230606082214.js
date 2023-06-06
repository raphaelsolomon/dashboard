const express = require("express");
const Vulcanizer = require("../../model/vulcanizer/vulcanizer.model");
const Vulcanizer_users = require("../../model/vulcanizer/vulcanizer.user.model");
const route = express.Router();

route.get('/', (req, res) => {
    res.status(200).render('../vulcanizer/vulcanizer', { alert: [] });
})

route.post('/', (req, res) => {
    const msg = [];
    msg.push({ msg: "Record Successfully Inserted", err: false });
    return Vulcanizer.create(req.body).then((vulcanizer) =>
        res.status(200).render('../vulcanizer/vulcanizer', { alert: msg })).then((err) => console.log(err));
})

route.get('/users', (req, res) => {
    res.status(200).render('../vulcanizer/vulcanizer_users', { alert: [] });
})

route.post('/users', (req, res) => {
    const msg = [];
    msg.push({ msg: "Record Successfully Inserted", err: false });
    return Vulcanizer_users.create(req.body).then((vulcanizer_users) =>
        res.status(200).render('../vulcanizer/vulcanizer_users', { alert: msg })).then((err) => console.log(err));
})

route.get('/table-users', (req, res) => {
    Vulcanizer_users
})
module.exports = route;