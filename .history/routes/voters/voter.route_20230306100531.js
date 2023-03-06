const express = require("express");
const Voter = require("../../model/voters/voter.model");
const route = express.Router();

route.get('/', (req, res) => {
    res.status(200).render('../voters/index', { alert: [] });
})

route.post('/', (req, res) => {
    const msg = [];
    msg.push({ msg: "Record Successfully Inserted", err: false });
    return Voter.create(req.body).then((voter) =>
        res.status(200).render('../voters/index', { alert: msg })).then((err) => console.log(err));
})

route.post('/table', (req, res) => {
    return Voter.findAll().then((voter) =>
        res.status(200).render('../voters/table', { alert: msg })).then((err) => console.log(err));
})


module.exports = route;