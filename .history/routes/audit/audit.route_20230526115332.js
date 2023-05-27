const express = require("express");
const Fort = require("../model/fort.model copy");
const route = express.Router();

route.get('/', async (req, res) => {
    re