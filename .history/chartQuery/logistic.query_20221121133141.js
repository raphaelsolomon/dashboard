const sequelize = require("../config/database.config");
const Logistics = require("../model/logistics.model");

exports.getTotalOrders = async (req, res) => {
    return await Logistics.count({});;
}

exports.getTotalOrders = async (req, res) => {
    return await Logistics.count({
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('consignee')), 'consignee']]
    });
}

exports.getTotalOrders = async (req, res) => {
    return await Logistics.count({
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('consignee')), 'consignee']]
    });
}

exports.topCustomerByItemShipped = async (req, res) => {
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

exports.topLocationsDelivered = async (req, res) => {
    return await Logistics.findAll({
        attributes: ['c_deliveryAddress_str', [sequelize.fn('COUNT', sequelize.col('c_deliveryAddress_str')), 'total']],
        raw: true,
        group: 'c_deliveryAddress_str', order: [[sequelize.fn('COUNT', sequelize.col('c_deliveryAddress_str')), 'DESC']]
    });
}

exports.topPickUpsDelivered = async (req, res) => {
    return await Logistics.findAll({
        attributes: ['pickupaddress_area', [sequelize.fn('COUNT', sequelize.col('pickupaddress_area')), 'total']],
        raw: true,
        group: 'pickupaddress_area', order: [[sequelize.fn('COUNT', sequelize.col('pickupaddress_area')), 'DESC']]
    });
}

exports.topRiders = async (req, res) => {
    return await Logistics.findAll({
        attributes: ['rider', [sequelize.fn('COUNT', sequelize.col('rider')), 'total']],
        raw: true,
        group: 'rider', order: [[sequelize.fn('COUNT', sequelize.col('rider')), 'DESC']]
    });
}