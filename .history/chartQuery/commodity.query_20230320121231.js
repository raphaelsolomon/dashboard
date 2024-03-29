const sequelize = require("../config/database.config");
const Commodity = require("../model/commodity.model");

exports.getmostAdvertising = async (req) => {
    let advertising_mediums = [];
    let magnitudes = [];
    let commodity = [];

    commodity = await req.user.getCommodities({
        wher
        attributes: ['advertising_medium', [sequelize.fn('COUNT', sequelize.col('advertising_medium')), 'total']],
        group: 'advertising_medium', order: [[sequelize.fn('COUNT', sequelize.col('advertising_medium')), 'DESC']]
    });

    commodity.forEach((e) => {
        advertising_mediums.push(e.dataValues.advertising_medium);
        magnitudes.push(e.dataValues.total);
    })
    return { advertising_medium: advertising_mediums.join(', '), magnitude: magnitudes.join(', ') };
}


exports.getmostDeliveryLocation = async (req) => {
    let advertising_mediums = [];
    let magnitudes = [];
    let commodity = [];

    commodity = await req.user.getCommodities({
        attributes: ['delivery_location', [sequelize.fn('COUNT', sequelize.col('delivery_location')), 'total']],
        group: 'delivery_location', order: [[sequelize.fn('COUNT', sequelize.col('delivery_location')), 'DESC']]
    });

    commodity.forEach((e) => {
        advertising_mediums.push(e.dataValues.delivery_location);
        magnitudes.push(e.dataValues.total);
    })
    return { delivery_location: advertising_mediums.join(', '), magnitude: magnitudes.join(', ') };
}

exports.getFrequentGender = async (req) => {
    let advertising_mediums = [];
    let magnitudes = [];
    let commodity = [];

    commodity = await req.user.getCommodities({
        attributes: ['purchasing_gender', [sequelize.fn('COUNT', sequelize.col('purchasing_gender')), 'total']],
        group: 'purchasing_gender', order: [[sequelize.fn('COUNT', sequelize.col('purchasing_gender')), 'DESC']]
    });

    commodity.forEach((e) => {
        advertising_mediums.push(e.dataValues.purchasing_gender);
        magnitudes.push(e.dataValues.total);
    })
    return { gender: advertising_mediums.join(', '), magnitude: magnitudes.join(', ') };
}

exports.getFrequentTransaction = async (req) => {
    let advertising_mediums = [];
    let magnitudes = [];
    let commodity = [];

    commodity = await req.user.getCommodities({
        attributes: ['mode_transaction', [sequelize.fn('COUNT', sequelize.col('mode_transaction')), 'total']],
        group: 'mode_transaction', order: [[sequelize.fn('COUNT', sequelize.col('mode_transaction')), 'DESC']]
    });

    commodity.forEach((e) => {
        advertising_mediums.push(e.dataValues.mode_transaction);
        magnitudes.push(e.dataValues.total);
    })
    return { mode_transaction: advertising_mediums.join(', '), magnitude: magnitudes.join(', ') };
}

exports.getFrequentPayment = async (req) => {
    let advertising_mediums = [];
    let magnitudes = [];
    let commodity = [];

    commodity = await req.user.getCommodities({
        attributes: ['mode_payment', [sequelize.fn('COUNT', sequelize.col('mode_payment')), 'total']],
        group: 'mode_payment', order: [[sequelize.fn('COUNT', sequelize.col('mode_payment')), 'DESC']]
    });

    commodity.forEach((e) => {
        advertising_mediums.push(e.dataValues.mode_payment);
        magnitudes.push(e.dataValues.total);
    })
    return { mode_payment: advertising_mediums.join(', '), magnitude: magnitudes.join(', ') };
}

exports.getPurchaseItems = async (req) => {
    let commodity = [];

    commodity = await req.user.getCommodities({
        attributes: ['commodity', [sequelize.fn('COUNT', sequelize.col('commodity')), 'total']],
        limit: 3,
        group: 'commodity', order: [[sequelize.fn('COUNT', sequelize.col('commodity')), 'DESC']]
    });

    return commodity;
}

exports.getFrequentCustomers = async (req) => {
    let commodity = [];

    commodity = await req.user.getCommodities({
        attributes: ['customer_name', [sequelize.fn('COUNT', sequelize.col('customer_name')), 'total']],
        limit: 3,
        group: 'customer_name', order: [[sequelize.fn('COUNT', sequelize.col('customer_name')), 'DESC']]
    });

    return commodity;
}

exports.getTotalProfit = async (req) => {
    let total = 0;
    const commodity = await req.user.getCommodities();
    commodity.forEach((c) => {
        total = total + Number.parseInt(`${c.dataValues.purchased_cost}`.replace(/,/g, ''));
    });
    return total;
}

exports.getTotalSales = async (req) => {
    let total = 0;
    const commodity = await req.user.getCommodities();
    commodity.forEach((c) => {
        total = total + Number.parseInt(`${c.dataValues.sales_cost}`.replace(/,/g, ''));
    });
    return total;
}

exports.getProfitByDay = async (req) => {
    let result = {};
    const commodity = await req.user.getCommodities({ limit: 7 });
    commodity.forEach((e) => {
        if (result[`${e.dataValues.purchased_date}`] !== undefined) {
            let profit = Number.parseInt(`${e.dataValues.sales_cost}`.replace(/,/g, '')) - Number.parseInt(`${e.dataValues.purchased_cost}`.replace(/,/g, ''));
            result[`${e.dataValues.purchased_date}`] = result[`${e.dataValues.purchased_date}`] + profit;
        } else {
            let profit = Number.parseInt(`${e.dataValues.sales_cost}`.replace(/,/g, '')) - Number.parseInt(`${e.dataValues.purchased_cost}`.replace(/,/g, ''));
            result[`${e.dataValues.purchased_date}`] = profit;
        }
    });
    return { keys: Object.keys(result).join(', '), values: Object.values(result).join(', ') };
}