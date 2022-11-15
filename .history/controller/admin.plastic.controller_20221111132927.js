const sequelize = require("../config/database.config");
const User = require("../model/user.model");
const { Op } = require('sequelize');
const Plastic = require("../model/plastic.model");

exports.index = async (req, res) => {

    const plastic = await Plastic.findAll({
        where: { trade: 'Plastics' }, include: [{
            model: Commodity
        }], limit: 7
    });

    return res.status(200).render('../admin/plastics/index', { users: req.user });
}

function getPreviousDay(date = new Date()) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);

    return previous;
}