const express = require("express");
const Survey = require("../../model/survey/survey.model");
const route = express.Router();

route.get('/', (req, res) => {
    return res.status(200).render('../survey/index', { alert: [{ msg: 'survey loaded successfully', err: true }] });
})

route.post('/submit', (req, res) => {
    const alert = [];
    return Survey.create(req.body).then((survey) => {
        return res.status(200).render('../survey/index', {alert: alert});
    }).catch((error) => {});
    console.log(req.body)
})

module.exports = route;