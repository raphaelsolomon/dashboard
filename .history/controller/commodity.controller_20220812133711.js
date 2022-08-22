const Commodity = require('../model/commodity.model');

exports.commodityIndex = async(req, res, next) => {

    var data = {
        
        tableLimit: limitPlastic,
    }
    return res.status(200).render('../commodities/index', { title: 'Commodity Sales', user: req.user, data: data })
}

exports.getTable = async(req, res, next) => {
    const plastics = await req.user.getCommodities();
    return res.status(200).render('../commodities/table', { listItem: plastics, user: req.user, title: 'Tables' });
}

exports.addItem = async(req, res, next) => {
    return res.status(200).render('../commodities/add', { user: req.user, title: 'Add Items' });
}