const express = require("express");
const Delivery = require("../../model/delivery/delivery.model");
const route = express.Router();

route.get('/', (req, res) => {
    res.status(200).render('../delivery/index', { alert: [] });
})

route.post('/', (req, res) => {
    const msg = [];
    msg.push({ msg: "Record Successfully Inserted", err: false });
    return Older.create(req.body).then((older) =>
        res.status(200).render('../delivery/index', { alert: msg })).then((err) => console.log(err));
})

route.get('/table', (req, res) => {
    return Older.findAll().then((olders) =>
        res.status(200).render('../delivery/table', { input: olders })).then((err) => console.log(err));
})

route.get('/table/:id', (req, res) => {
    return Older.destroy({ where: { id: req.params.id } }).then((_) =>
        res.status(200).redirect('/survey/old/table'));
})

module.exports = route;