const express = require("express");
const Older = require("../../model/old/old.model");
const route = express.Router();

route.get('/', (req, res) => {
    res.status(200).render('../old_age/index', { alert: [] });
})

route.post('/', (req, res) => {
    const msg = [];
    msg.push({ msg: "Record Successfully Inserted", err: false });
    return Older.create(req.body).then((voter) =>
        res.status(200).render('../old_age/index', { alert: msg })).then((err) => console.log(err));
})

route.get('/table', (req, res) => {
    return Voter.findAll().then((voters) =>
        res.status(200).render('../old_age/table', { input: voters })).then((err) => console.log(err));
})

route.get('/table/:id', (req, res) => {
    return Voter.destroy({ where: { id: req.params.id } }).then((_) =>
        res.status(200).redirect('/survey/old_age/table'));
})

module.exports = route;