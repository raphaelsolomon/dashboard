const sequelize = require("../config/database.config");
const User = require("../model/user.model");
const { Op } = require('sequelize');
const Sorting = require('../
const Plastic = require("../model/plastic.model");

exports.index = async (req, res) => {
    const date = new Date();
    const plastic = await Plastic.findAll();

    const highestLocationByDate = await Plastic.findOne({
        where: { date: `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}` },
        attributes: ['retrieved_from', [sequelize.fn('COUNT', sequelize.col('retrieved_from')), 'total']],
        raw: true,
        group: 'retrieved_from', order: [[sequelize.fn('COUNT', sequelize.col('retrieved_from')), 'DESC']]
    });

    const highestLocation = await Plastic.findOne({
        attributes: ['zone', [sequelize.fn('COUNT', sequelize.col('zone')), 'total']],
        raw: true,
        group: 'zone', order: [[sequelize.fn('COUNT', sequelize.col('zone')), 'DESC']]
    });

    const highestBrand = await Plastic.findOne({
        attributes: ['product', [sequelize.fn('COUNT', sequelize.col('product')), 'total']],
        raw: true,
        group: 'product', order: [[sequelize.fn('COUNT', sequelize.col('product')), 'DESC']]
    });
    console.log(highestLocationByDate);
    console.log(highestLocation);
    console.log(highestBrand);


    return res.status(200).render('../admin/plastics/index', { users: req.user, plastic: plastic, highestLocation: highestLocation, highestBrand: highestBrand, highestLocationByDate: highestLocationByDate });
}

exports.getTable = async (req, res) => {
    const date = new Date();
    const plastic = await Plastic.findAll({ where: { date: `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}` } });
    return res.status(200).render('../admin/plastics/daily', { users: req.user, plastic: plastic });
}

exports.getBrand = async (req, res) => {
    const date = new Date();
    const plastic = await Plastic.findAll({ 
        attributes: ['product', [sequelize.fn('COUNT', sequelize.col('product')), 'total']],
        raw: true,
        group: 'product', order: [[sequelize.fn('COUNT', sequelize.col('product')), 'DESC']]
     });
    return res.status(200).render('../admin/plastics/brand', { users: req.user, plastic: plastic });
}

exports.getTotal = async (req, res) => {
    const plastic = await Plastic.findAll({
        attributes: ['retrieved_from', [sequelize.fn('COUNT', sequelize.col('retrieved_from')), 'total']],
        raw: true,
        group: 'retrieved_from', order: [[sequelize.fn('COUNT', sequelize.col('retrieved_from')), 'DESC']]
    });
    console.log(plastic);
    return res.status(200).render('../admin/plastics/total', { users: req.user, plastic: plastic });
}

exports.getCaps = async (req, res) => {
    const sorting = await sorting.findAll({
    });
    return res.status(200).render('../admin/plastics/sorting_caps', { users: req.user, plastic: {} });
}

exports.getLabel = async (req, res) => {
    return res.status(200).render('../admin/plastics/sorting_color', { users: req.user, plastic: {} });
}

exports.getColors = async (req, res) => {
    return res.status(200).render('../admin/plastics/sorting_label', { users: req.user, plastic: {} });
}


function getPreviousDay(date = new Date()) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);

    return previous;
}