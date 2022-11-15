const sequelize = require("../config/database.config");
const User = require("../model/user.model");
const { Op } = require('sequelize');
const Plastic = require("../model/plastic.model");

exports.index = async (req, res) => {

    const plastic = await Plastic.findAll({});

    return res.status(200).render('../admin/plastics/index', { users: req.user, plastic: plastic });
}

exports.getTable = async (req, res) => {
    const date = new Date();
    const plastic = await Plastic.findAll({ where: {date: `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`} });
    return res.status(200).render('../admin/plastics/daily', { users: req.user, plastic: plastic });
}

exports.getBrand = async (req, res) => {
    const date = new Date();
    const plastic = await Plastic.findAll({ where: {date: `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`} });
    return res.status(200).render('../admin/plastics/brand', { users: req.user, plastic: plastic });
}

exports.getTotal = async (req, res) => {
    const date = new Date();
    const plastic = await Plastic.findAll({ where: {},
     });
    return res.status(200).render('../admin/plastics/total', { users: req.user, plastic: plastic });
}


function getPreviousDay(date = new Date()) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);

    return previous;
}