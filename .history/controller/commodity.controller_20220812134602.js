const Commodity = require('../model/commodity.model');

exports.commodityIndex = async(req, res, next) => {
    const limitPlastic = await req.user.getCommodities({
        limit: 7,
        order: [
            ['createdAt', 'DESC']
        ],
    });
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

exports.getCharts = async(req, res, next) => {
    var data = {};
    return res.status(200).render('../commodities/chart', { title: 'Charts', user: req.user, data: data });
}

exports.deleteItem = async(req, res, next) => {
    return Commodity.destroy({ where: { id: req.params.id } }).then((_) => {
        return res.status(200).redirect('/table');
    }).catch((err) => console.log(err));
}

exports.recentId = async(req, res, next) => {
    var commodities = [];
    if (req.params.id === 1) {
        commodities = await req.user.getCommodities({
            limit: 7,
            order: [
                ['createdAt', 'DESC']
            ],
            attributes: LOGISTIC_ATTRIBUTE,
            raw: true
        });
    } else {
        commodities = await req.user.getCommodities({
            attributes: LOGISTIC_ATTRIBUTE,
            raw: true
        });
    }

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(logistic, {
        origin: 'A2',
        skipHeader: true
    });
    XLSX.utils.sheet_add_aoa(ws, [LOGISTIC_HEADER]);
    XLSX.utils.book_append_sheet(wb, ws, 'Logistics');
    const buffer = XLSX.write(wb, { bookType: 'csv', type: 'buffer' });
    res.attachment(`${Date.now()}.csv`);

    return res.send(buffer);
}