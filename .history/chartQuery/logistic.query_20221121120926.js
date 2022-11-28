const sequelize = require("../config/database.config");
const Logistics = require("../model/logistics.model");

exports.getTotalOrders = async (req, res) => {
    return await Logistics.count({});;
}

exports.getTotalOrders = async (req, res) => {
    return await Logistics.count({
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('consignee')) ,'consignee']]
    });
}

exports.getTotalOrders = async (req, res) => {
    return await Logistics.count({
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('consignee')) ,'consignee']]
    });
}

exports.topGoodsDelivered = async (req, res) => {
    return await Logistics.findAll({
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('consignee')) ,'consignee']]
    });
}