const sequelize = require("../config/database.config");
const Logistics = require("../model/logistics.model");

exports.getTotalOrders = async (req, res) => {
    return await Logistics.count({});;
}

exports.getTotalCustomers = async (req, res) => {
    return await Logistics.findAll({
        attributes: ['consignee', [sequelize.fn('COUNT', sequelize.col('consignee')), 'total']],
        raw: true,
        group: 'consignee', order: [[sequelize.fn('COUNT', sequelize.col('consignee')), 'DESC']]
    }).length;
}

exports.getTotalAmount = async (req, res) => {
    var result = 0.0;
    const amount = await Logistics.findAll({raw: true});
    amount.forEach(element => {
        result = result + Number.parseInt(element.amount_paid);
    });
    return result;
}

exports.highestModeOfTransaction = async (req, res) => {
    return await Logistics.findAll({
        attributes: ['mode_of_pay', [sequelize.fn('COUNT', sequelize.col('mode_of_pay')), 'total']],
        raw: true,
        group: 'mode_of_pay', order: [[sequelize.fn('COUNT', sequelize.col('mode_of_pay')), 'DESC']]
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
