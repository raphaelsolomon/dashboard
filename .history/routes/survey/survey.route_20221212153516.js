const express = require("express");
const route = express.Router();

route.get('/', (req, res) => {
    return res.status(200).render('../survey/index', { alert: [{ msg: 'survey loaded successfully', err: true }] });
})

route.post('/submit', (req, res) => {
    const alert = [];
    Sur
    console.log(req.body)
})

module.exports = route;