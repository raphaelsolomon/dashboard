const express = require("express");
const route = express.Router();

route.get('/', (req, res, next) => {
    res.status(200).render('Hello World!');
});


module.exports = route;