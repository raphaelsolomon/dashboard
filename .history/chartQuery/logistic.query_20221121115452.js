const sequelize = require("../config/database.config");
const Logistics = require("../model/logistics.model");

exports.getTotalOrders = async (req, res) => {
    const logistics = await Logistics.findAll({
        where: {
            status: true
        }

    });
}