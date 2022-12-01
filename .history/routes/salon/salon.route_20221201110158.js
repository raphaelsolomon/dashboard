const express = require("express");
const route = express.Router();

route.get('/', (req, res, next) => {
    res.status(200).render('../salon/index', {});
});

route.post('/')


module.exports = route;