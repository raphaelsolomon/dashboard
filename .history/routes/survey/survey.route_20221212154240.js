const express = require("express");
const Survey = require("../../model/survey/survey.model");
const route = express.Router();

route.get('/', (req, res) => {
    return res.status(200).render('../survey/index', { alert: [] });
})

route.post('/submit', (req, res) => {
    const alert = [];
    return Survey.create(req.body).then((survey) => {
        alert.push({ msg:'survey submitted successfully', err: false });
        return res.status(200).json( {alert: alert} );
    }).catch((error) => {
        alert.push({ msg: `Unable to insert record ${err}`, err: true });
        return res.status(200).render('../survey/index', { alert: alert });
     });
})

module.exports = route;