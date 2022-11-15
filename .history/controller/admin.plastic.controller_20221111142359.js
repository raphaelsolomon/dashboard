const sequelize = require("../config/database.config");
const User = require("../model/user.model");
const { Op } = require('sequelize');
const Plastic = require("../model/plastic.model");

exports.index = async (req, res) => {

    const plastic = await Plastic.findAll({});

    return res.status(200).render('../admin/plastics/index', { users: req.user, plastic: plastic });
}

exports.getTable = async (req, res) => {
    const plastic = await Plastic.findAll({});
    return res.status(200).render('../admin/plastics/dail', { users: req.user, plastic: plastic });
}


function getPreviousDay(date = new Date()) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);

    return previous;
}