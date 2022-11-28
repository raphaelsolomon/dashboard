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
        attributes: ['itemToBeDelivered', [sequelize.fn('COUNT', sequelize.col('itemToBeDelivered')), 'total']],
        raw: true,
        group: 'itemToBeDelivered', order: [[sequelize.fn('COUNT', sequelize.col('itemToBeDelivered')), 'DESC']]
    });
}

exports.topGoodsDelivered = async (req, res) => {
    return await Logistics.findAll({
        attributes: ['itemToBeDelivered', [sequelize.fn('COUNT', sequelize.col('itemToBeDelivered')), 'total']],
        raw: true,
        group: 'itemToBeDelivered', order: [[sequelize.fn('COUNT', sequelize.col('itemToBeDelivered')), 'DESC']]
    });
}