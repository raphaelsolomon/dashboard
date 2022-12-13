const express = require("express");
const Survey = require("../../model/survey/survey.model");
const route = express.Router();

route.get('/', (req, res) => {
    return res.status(200).render('../survey/index', { alert: [] });
})

route.post('/submit', (req, res) => {
    return Survey.create(req.body).then((survey) => {
        return res.status(200).json({ msg: 'survey submitted successfully', err: false });
    }).catch((error) => {
        return res.status(200).json({ msg: `Unable to insert record ${err}`, err: true });
    });
})

route.get('/table', (req, res) => {
    console.log('gjofiifdoisofijiodf')
    return Survey.findAll().then((survey) => {
        return res.status(200).render('../survey/', { listItems: survey });
    });
})

module.exports = route;