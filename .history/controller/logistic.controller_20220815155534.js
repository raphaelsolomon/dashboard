const Logistics = require('../model/logistics.model');
const date = require('date-and-time');
const sequelize = require('../config/database.config');
const { Op } = require('sequelize');
var currencyFormatter = require('currency-formatter');
const XLSX = require("xlsx");
var currencyFormatter = require('currency-formatter');
const { LOGISTIC_ATTRIBUTE, LOGISTIC_HEADER } = require('../constant/value.const');

exports.logisticIndex = async(req, res, next) => {
    var listDataNo = [],
        listDataName = [];
    var activeCount = [],
        activeName = [];
    var customLoop = [];
    //NUMBER OF DELIVERIES COMPLETED
    const completed = await Logistics.count({ where: { userId: req.user.id, status: 'done' } });
    //TOTAL AMOUNT MADE FROM DELIVERIES
    const totalAmount = await Logistics.sum('amount_paid', {
        where: { userId: req.user.id }
    });
    //DAYS WITH THE MOST DELIVERIES
    const mostDelivery = await Logistics.max('createdAt', {
        where: { id: req.user.id },
    });
    //Total count of ride cancel
    const rideCancelled = await Logistics.count({
        where: {
            userId: req.user.id,
            status: {
                [Op.ne]: ['done']
            }
        }
    });
    //list of deliveries with limit
    const limitLogist = await req.user.getLogistics({
        limit: 7,
        order: [
            ['createdAt', 'DESC']
        ],
    });
    //Amount Of Money Made Daily
    const moneyMadeDaily = await req.user.getLogistics({
        where: {
            amount_paid: {
                [Op.or]: {
                    [Op.notLike]: 'cancel',
                    [Op.notLike]: ''
                }
            },
            dateOfOrder: {
                [Op.and]: {
                    [Op.notLike]: '',
                }
            }
        }
    });

    moneyMadeDaily.forEach((e) => {
            if (e.dateOfOrder !== '' && e.amount_paid !== 'cancel') {
                var exist = customLoop.findIndex((element) => element.dateOfOrder === e.dateOfOrder);
                if (exist === -1) {
                    customLoop.push(e);
                    return;
                }
                customLoop[exist].amount_paid = Math.floor(customLoop[exist].amount_paid) + Math.floor(e.amount_paid)
            }
        })
        //Most Frequent Delivery Location
    const frequentDelivery = await req.user.getLogistics({
        attributes: [
            'c_deliveryAddress_area', [sequelize.fn('count', sequelize.col('c_deliveryAddress_area')), 'count'],
        ],
        group: ['logistics.c_deliveryAddress_area'],
        raw: true,
        limit: 5,
        order: sequelize.literal('count DESC')
    });
    frequentDelivery.forEach((e) => {
            listDataNo.push(e.count);
            listDataName.push(e.c_deliveryAddress_area);
        })
        //Most Active Rider
    const activeRider = await req.user.getLogistics({
        where: {
            status: {
                [Op.eq]: ['done']
            }
        },
        attributes: [
            'rider', [sequelize.fn('count', sequelize.col('id')), 'count'],
        ],
        group: ['logistics.rider'],
        raw: true,
        limit: 10,
        order: sequelize.literal('count DESC')
    });


    activeRider.forEach((e) => {
        activeName.push(e.rider);
        activeCount.push(e.count);
    })

    var data = {
        completedDelivery: completed,
        totalAmount: currencyFormatter.format(`${totalAmount}`, { code: 'NGN' }),
        mostDeliveryDay: date.format(new Date(mostDelivery), 'YYYY-MM-DD'),
        totalRideCancelled: rideCancelled,
        tableLimit: limitLogist,
        moneyMadeDaily: customLoop.sort((a, b) => Math.floor(`${b.amount_paid}`) - Math.floor(`${a.amount_paid}`)).splice(0, 4),
        deliveryLocation: {
            dataNo: listDataNo.join(','),
            dataName: listDataName.join(',')
        },
        mostActiveRider: {
            activeName: activeName.join(','),
            activeCount: activeCount.join(',')
        }
    }

    const notification = await req.
    return res.status(200).render('../logistics/index', { title: 'Logistics', user: req.user, data: data,  });
}

exports.recentId = async(req, res, next) => {
    var logistic = [];
    if (req.params.id === 1) {
        logistic = await req.user.getLogistics({
            limit: 7,
            order: [
                ['createdAt', 'DESC']
            ],
            attributes: LOGISTIC_ATTRIBUTE,
            raw: true
        });
    } else {
        logistic = await req.user.getLogistics({
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
    res.attachment(`logistics_${Date.now()}.csv`);

    return res.send(buffer);
}

exports.addItem = async(req, res, next) => {
    return res.status(200).render('../logistics/add', { user: req.user, title: 'Add Items' });
}

exports.getTable = async(req, res, next) => {
    return req.user.getLogistics().then((logistics) => {
        return res.status(200).render('../logistics/table', { listItem: logistics, user: req.user, title: 'Tables' })
    });
}

exports.getCharts = async(req, res, next) => {
    var listMoneyNo = ['1000'],
        listDay = [];
    var activeCount = [],
        activeName = [];
    var frequentDelArea = [],
        frequentDelCount = [];
    var pickupArea = [],
        pickupCount = [];
    var mostDeliveryItem = [],
        mostDeliveryCount = [];
    var consigneeName = [],
        consigneeCount = [];
    var consignorName = [],
        consignorCount = [];

    const activeRider = await req.user.getLogistics({
        where: { status: 'done' },
        attributes: [
            'rider', [sequelize.fn('count', sequelize.col('id')), 'count'],
        ],
        group: ['logistics.rider'],
        raw: true,
    });

    const moneyMadeDaily = await req.user.getLogistics({
        where: {
            amount_paid: {
                [Op.in]: [sequelize.literal('SELECT MAX(amount_paid) FROM logistics GROUP BY dateOfOrder')]
            }
        },
        attributes: ['dateOfOrder', 'amount_paid'],

        order: sequelize.literal('dateOfOrder DESC')
    });

    //Most Frequent Delivery Location
    const frequentDelivery = await req.user.getLogistics({
        attributes: [
            'c_deliveryAddress_area', [sequelize.fn('count', sequelize.col('c_deliveryAddress_area')), 'count'],
            //[sequelize.fn('sum', sequelize.col('noOfPerson')), 'noOfPerson']
        ],
        group: ['logistics.c_deliveryAddress_area'],
        raw: true,
        limit: 5,
        order: sequelize.literal('count DESC')
    });

    const frequentPickup = await req.user.getLogistics({
        attributes: [
            'pickupaddress_area', [sequelize.fn('count', sequelize.col('pickupaddress_area')), 'count'],
            //[sequelize.fn('sum', sequelize.col('noOfPerson')), 'noOfPerson']
        ],
        group: ['logistics.pickupaddress_area'],
        raw: true,
        order: sequelize.literal('count DESC')
    });

    //most delivered goods
    const deliveredGoods = await req.user.getLogistics({
        attributes: [
            'itemToBeDelivered', [sequelize.fn('count', sequelize.col('itemToBeDelivered')), 'count'],
        ],
        group: ['logistics.itemToBeDelivered'],
        raw: true,
    });

    //most patronize consignee
    const patronizeConsignee = await req.user.getLogistics({
        attributes: [
            'consignee', [sequelize.fn('count', sequelize.col('consignee')), 'count'],
        ],
        group: ['logistics.consignee'],
        raw: true,
    });
    //most patronize consignor
    const patronizeConsignor = await req.user.getLogistics({
        attributes: [
            'consignor', [sequelize.fn('count', sequelize.col('consignor')), 'count'],
        ],
        group: ['logistics.consignor'],
        raw: true,
    });
    patronizeConsignee.forEach((e) => {
        if (e.consignee !== '') {
            consigneeName.push(e.consignee);
            consigneeCount.push(e.count);
        }
    })

    patronizeConsignor.forEach((e) => {
        if (e.consignor !== '') {
            consignorName.push(e.consignor);
            consignorCount.push(e.count);
        }
    })


    frequentPickup.forEach((e) => {
        if (`${e.pickupaddress_area}` !== 'etc.' && e.pickupaddress_area !== '') {
            pickupArea.push(`${e.pickupaddress_area}`);
            pickupCount.push(e.count);
        }
    })

    moneyMadeDaily.forEach((e) => {
        if (e.amount_paid !== 'cancel' && e.amount_paid !== '') {
            listDay.push(`${e.dateOfOrder}`);
            listMoneyNo.push(e.amount_paid);
        }
    })

    activeRider.forEach((e) => {
        activeName.push(e.rider);
        activeCount.push(e.count);
    })


    frequentDelivery.forEach((e) => {
        if (e.c_deliveryAddress_area !== '') {
            frequentDelArea.push(e.c_deliveryAddress_area);
            frequentDelCount.push(e.count);
        }
    });

    deliveredGoods.forEach((e) => {
        if (e.itemToBeDelivered !== '') {
            mostDeliveryItem.push(e.itemToBeDelivered);
            mostDeliveryCount.push(e.count)
        }
    })


    var data = {
        activeRider: {
            activeName: activeName.join(','),
            activeCount: activeCount.join(',')
        },
        moneyMadeDaily: {
            listMoneyNo: listMoneyNo.join(','),
            listDay: listDay.join(',')
        },
        frequentDelivery: {
            frequentDelArea: frequentDelArea.join(','),
            frequentDelCount: frequentDelCount.join(',')
        },
        frequentPickup: {
            pickupArea: pickupArea.join(','),
            pickupCount: pickupCount.join(',')
        },
        deliveredGoods: {
            mostDeliveryItem: mostDeliveryItem.join(','),
            mostDeliveryCount: mostDeliveryCount.join(',')
        },
        patronizeConsignee: {
            consigneeName: consigneeName.join(','),
            consigneeCount: consigneeCount.join(',')
        },
        patronizeConsignor: {
            consignorName: consignorName.join(','),
            consignorCount: consignorCount.join(',')
        }
    };

    return res.status(200).render('../logistics/chart', { title: 'Charts', user: req.user, data: data });
}

exports.deleteItem = async(req, res, next) => {
    return Logistics.destroy({ where: { id: req.params.id } }).then((_) => {
        return res.status(200).redirect('/table');
    }).catch((err) => console.log(err));
}