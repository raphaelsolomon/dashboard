const { Op } = require('sequelize');
const sequelize = require('../config/database.config');
const { PLASTIC_HEADER, PLASTIC_ATTRIBUTE } = require('../constant/value.const');
const Plastics = require('../model/plastic.model')
const date = require('date-and-time');


exports.plasticIndex = async (req, res, next) => {
    var retrievalBrandDailyProduct = [],
        retrievalBrandDailyCount = [];

    var brandWithHighestProducts = [],
        brandWithHighestCounts = [];

    const limitPlastic = await req.user.getPlastics({
        limit: 7,
        order: [
            ['date', 'DESC']
        ],
    });
    //most consumed beverage (initial content) from retrieval daily
    const getMostConsumed = await req.user.getPlastics({
        where: { date: date.format(new Date(Date.now()), 'MM/DD/YYYY') },
        attributes: [
            'initial_content', [sequelize.fn('count', sequelize.col('initial_content')), 'count'],
        ],
        group: ['plastics.initial_content'],
        raw: true,
        limit: 4,
        order: sequelize.literal('count DESC')
    });

    //NUMBER OF PLASTICS RETRIEVED
    const totalPlastics = await Plastics.count({
        where: { userId: req.user.id }
    });
    //MOST RETRIEVED PRODUCT
    const totalRetrieveProduct = await Plastics.findOne({
        attributes: [[
            sequelize.fn('max', sequelize.col('product')), 'product'
        ]],
        where: {
            userId: req.user.id
        }
    });

    const totalRetrieveLocation = await Plastics.findOne({
        attributes: [[
            sequelize.fn('max', sequelize.col('retrieved_from')), 'retrieved_from'
        ]],
        where: {
            userId: req.user.id
        }
    });

    //DAYS WITH THE HIGHEST RETRIEVAL
    const daysWithHighestRetrieval = await Plastics.findOne({
        attributes: [[
            sequelize.fn('max', sequelize.col('date')), 'date'
        ]],
        where: {
            userId: req.user.id
        }
    });

    //count of retrieved pet plastics by brands daily


    //brand with the highest products from retrieving daily
    const brandWithHighestProduct = [];
    const retrievalBrandDaily = [];


    retrievalBrandDaily.forEach((e) => {
        retrievalBrandDailyProduct.push(e.product);
        retrievalBrandDailyCount.push(e.count);
    });


    brandWithHighestProduct.forEach((e) => {
        brandWithHighestProducts.push(e.manufacturer);
        brandWithHighestCounts.push(e.count);
    })

    var data = {
        tableLimit: limitPlastic,
        totalPlastics: totalPlastics,
        totalRetrievedProduct: totalRetrieveProduct.product,
        totalRetrieveLocation: totalRetrieveLocation.retrieved_from,
        daysWithHighestRetrieval: daysWithHighestRetrieval.date,
        brandWithHighestProduct: {
            brandWithHighestProducts: brandWithHighestProducts.join(','),
            brandWithHighestCounts: brandWithHighestCounts.join(',')
        },
        retrievalBrandDaily: {
            retrievalBrandDailyProduct: retrievalBrandDailyProduct.join(','),
            retrievalBrandDailyCount: retrievalBrandDailyCount.join(',')
        },
        getMostConsumed: getMostConsumed
    };
    console.log(data);
    return res.status(200).render('../plastics/index', { user: req.user, data: data, title: 'Plastics' })
}

exports.addItem = async (req, res, next) => {
    return res.status(200).render('../plastics/add', { title: 'Plastics', user: req.user, title: 'Add Items' });
}

exports.getTable = async (req, res, next) => {
    const plastics = await req.user.getPlastics();
    return res.status(200).render('../plastics/table', { listItem: plastics, user: req.user, title: 'Tables' });
}

exports.recentId = async (req, res, next) => {
    var plastics = [];
    if (req.params.id === 1) {
        plastics = await req.user.getPlastics({
            limit: 7,
            order: [
                ['createdAt', 'DESC']
            ],
            attributes: PLASTIC_ATTRIBUTE,
            raw: true
        });
    } else {
        plastics = await req.user.getPlastics({
            attributes: PLASTIC_ATTRIBUTE,
            raw: true
        });
    }

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(plastics, {
        origin: 'A2',
        skipHeader: true
    });
    XLSX.utils.sheet_add_aoa(ws, [PLASTIC_HEADER]);
    XLSX.utils.book_append_sheet(wb, ws, 'Plastics');
    const buffer = XLSX.write(wb, { bookType: 'csv', type: 'buffer' });
    res.attachment(`${Date.now()}.csv`);

    return res.send(buffer);
}

exports.deleteItem = async (req, res, next) => {
    return Plastics.destroy({ where: { id: req.params.id } }).then((_) => {
        return res.status(200).redirect('/table');
    }).catch((err) => console.log(err));
}

exports.getCharts = async (req, res, next) => {
    var listName = [],
        listDay = [];
    var listMostConsumed = [],
        listMostCounsumedCount = [];
    var brandWithHighestProd = [],
        brandWithHighestCount = [];
    var countOfPlasticLocs = [],
        countOfPlasticCounts = [];
    var locationWithhighName = [],
        locationWithhighCount = [];

    //count of retrieved pet plastics by brands daily
    const retrievedPlastics = await req.user.getPlastics({
        where: { date: date.format(new Date(Date.now()), 'MM/DD/YYYY') },
        attributes: [
            'manufacturer', [sequelize.fn('count', sequelize.col('manufacturer')), 'count'],
        ],
        group: ['plastics.manufacturer'],
        raw: true,
    });

    retrievedPlastics.forEach((e) => {
        listName.push(e.manufacturer.substring(0, 9));
        listDay.push(e.count);
    })

    //most consumed beverage (initial content) from retrieval daily
    const getMostConsumed = await req.user.getPlastics({
        where: { date: date.format(new Date(Date.now()), 'MM/DD/YYYY') },
        attributes: [
            'initial_content', [sequelize.fn('count', sequelize.col('initial_content')), 'count'],
        ],
        group: ['plastics.initial_content'],
        raw: true,
    });

    getMostConsumed.forEach((e) => {
        listMostConsumed.push(e.initial_content.substring(0, 9));
        listMostCounsumedCount.push(e.count);
    })

    //brand with the highest products from retrieving daily
    const brandWithHighestProduct = await req.user.getPlastics({
        where: { date: date.format(new Date(Date.now()), 'MM/DD/YYYY') },
        attributes: [
            'manufacturer', [sequelize.fn('count', sequelize.col('product')), 'count'],
        ],
        group: ['plastics.manufacturer'],
        raw: true,
    });

    brandWithHighestProduct.forEach((e) => {
        brandWithHighestProd.push(e.manufacturer.substring(0, 9));
        brandWithHighestCount.push(e.count);
    })

    //daily count of pet plastics retrieved from across all locations
    const countOfPlasticLocation = await req.user.getPlastics({
        where: { date: date.format(new Date(Date.now()), 'MM/DD/YYYY') },
        attributes: [
            'retrieved_from', [sequelize.fn('count', sequelize.col('retrieved_from')), 'count'],
        ],
        group: ['plastics.retrieved_from'],
        raw: true,
    });


    countOfPlasticLocation.forEach((e) => {
        countOfPlasticLocs.push(e.retrieved_from.substring(0, 9));
        countOfPlasticCounts.push(e.count);
    })

    //locations with the highest pet plastics retrieved
    const locationWithHighestPlastics = await req.user.getPlastics({
        where: { date: date.format(new Date(Date.now()), 'MM/DD/YYYY') },
        attributes: [
            'retrieved_from', [sequelize.fn('count', sequelize.col('retrieved_from')), 'count'],
        ],
        group: ['plastics.retrieved_from'],
        raw: true,
    });


    locationWithHighestPlastics.forEach((e) => {
        locationWithhighName.push(e.retrieved_from.substring(0, 9));
        locationWithhighCount.push(e.count);
    })


    var data = {
        retrievedPlastics: {
            listName: listName.join(','),
            listDay: listDay.join(',')
        },
        getMostConsumed: {
            listMostConsumed: listMostConsumed.join(','),
            listMostCounsumedCount: listMostCounsumedCount.join(',')
        },
        brandWithHighestProduct: {
            brandWithHighestProd: brandWithHighestProd.join(','),
            brandWithHighestCount: brandWithHighestCount.join(',')
        },
        countOfPlasticLocation: {
            countOfPlasticLocs: countOfPlasticLocs.join(','),
            countOfPlasticCounts: countOfPlasticCounts.join(',')
        },
        locationWithHighestPlastics: {
            locationWithhighName: locationWithhighName.join(','),
            locationWithhighCount: locationWithhighCount.join(',')
        }
    };

    console.log(data)

    return res.status(200).render('../plastics/chart', { title: 'Charts', user: req.user, data: data });
}