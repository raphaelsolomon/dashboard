const express = require("express");
const route = express.Router();
const passport = require("passport");
const Saloon = require("../../model/salon/salon.model");
require('../../config/google.config');
const Sequelize = require('sequelize');
const { isGoogleAuthenticated } = require("../../utils/helper.util");
const { firstPage, openingClosing, staffNumbers, officeInCharge, brandExtensionUsed, brandCreamUsed, isAirconditioner, brandClipperUsed, brandEquipmentUsed, brandRelaxerUsed, operationalDays } = require("../../chartQuery/salon.query");
const Powder = require("../../model/salon/powder.model");

// route.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

// route.get('/auth/google/callback', passport.authenticate('google', {
//     successRedirect: '/salon/dashboard',
//     failureRedirect: '/salon/login'
// }));

// route.get('/login', (req, res, next) => {
//     res.send('<a href="http://localhost:4000/salon/auth/google">Google Login</a>');
// })

// route.get("/dashboard", isGoogleAuthenticated, (req, res) => {
//     res.json({ name: req.user })
// })

route.get('/', async (req, res) => {
    const officers = await Saloon.findAll({
        attributes: [
            [Sequelize.fn('DISTINCT', Sequelize.col('officer')), 'officer']],
        raw: true,
    });
    res.status(200).render('../salon/index', { alert: [], officers: officers.map((e) => e.officer).join(', ') });
});

route.post('/', (req, res) => {
    var services = [];
    var days = [];
    const { hair_styling, manicure, pedicure, lash, brows, micro, make_up, spa, hair_cut, hair_lock, hair_cuts, all_of_the_above } = req.body;
    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday, brand_extension_used, brand_powder, brand_equipment_used, brand_cream_used, brand_clipper_used, brand_relaxer_used } = req.body;

    req.body.brand_powder = brand_powder === undefined ? '' : `${brand_powder}`;
    req.body.brand_equipment_used = brand_equipment_used === undefined ? '' : `${brand_equipment_used}`;
    req.body.brand_cream_used = brand_cream_used === undefined ? '' : `${brand_cream_used}`;
    req.body.brand_clipper_used = brand_clipper_used === undefined ? '' : `${brand_clipper_used}`;
    req.body.brand_extension_used = brand_extension_used === undefined ? '' : `${brand_extension_used}`;
    req.body.brand_relaxer_used = brand_relaxer_used === undefined ? '' : `${brand_relaxer_used}`;

    //============================================================================
    if (monday === 'on') {
        days.push('Monday');
    }
    if (tuesday === 'on') {
        days.push('Tuesday');
    }
    if (wednesday === 'on') {
        days.push('Wednesday');
    }
    if (thursday === 'on') {
        days.push('Thursday');
    }
    if (friday === 'on') {
        days.push('Friday');
    }
    if (saturday === 'on') {
        days.push('Saturday');
    }
    if (sunday === 'on') {
        days.push('Sunday');
    }
    //=====================================================
    if (all_of_the_above === 'on') {
        req.body.service_type = 'all of the above';
        req.body.operational_days = days.join(', ')
    } else {
        if (hair_styling === 'on')
            services.push('hair styling');
        if (manicure === 'on')
            services.push('manicure');
        if (pedicure === 'on')
            services.push('pedicure');
        if (lash === 'on')
            services.push('lash');
        if (make_up === 'on')
            services.push('make up');
        if (spa === 'on')
            services.push('spa');
        if (hair_cut === 'on')
            services.push('hair cut');
        if (hair_lock === 'on')
            services.push('hair lock');
        if (hair_cuts === 'on')
            services.push('hair cuts');
        if (brows === 'on')
            services.push('brows');
        if (micro === 'on')
            services.push('micro blading');
        req.body.service_type = services.join(', ');
        req.body.operational_days = days.join(', ')
    }
    console.log(req.body)

    return Saloon.findAll({
        attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('officer')), 'officer']],
        raw: true,
    }).then((officers) => {
        if (req.body.id !== undefined) {
            return Saloon.findOne({ where: { id: req.body.id } }).then((e) => {
                return e.update(req.body).then((result) => {
                    const msg = [];
                    msg.push({ msg: "Record Successfully Updated", err: false });
                    req.body = {};
                    return res.status(200).render('../salon/edit', { input: result, alert: msg, officers: officers.map((e) => e.officer).join(', ') });
                }).catch((err) => {
                    const msg = [];
                    msg.push({ msg: `Unable to insert record ${err}`, err: true });
                    req.body = {};
                    return res.status(200).render('../salon/edit', { input: result, alert: msg, officers: officers.map((e) => e.officer).join(', ') });
                });
            });
        } else {
            return Saloon.create(req.body).then(() => {
                const msg = [];
                msg.push({ msg: "Record Successfully Inserted", err: false });
                req.body = {};
                if (brand_powder) {
                    console.log(brand_powder)
                }
                return res.status(200).render('../salon/index', { alert: msg, officers: officers.map((e) => e.officer).join(', ') });
            }).catch((err) => {
                const msg = [];
                msg.push({ msg: `Unable to insert record ${err}`, err: true });
                req.body = {};
                 res.status(500).render('../salon/index', { alert: msg, officers: officers.map((e) => e.officer).join(', ') });
                 return;
            });
        }
    });
});

route.get('/chart', async (req, res) => {
    const firstpage = await firstPage();
    const timing = await openingClosing();
    const staffNums = await staffNumbers();
    const officers = await officeInCharge()
    const brandExtension = await brandExtensionUsed();
    const brandCream = await brandCreamUsed();
    const isAc = await isAirconditioner();
    const brandClipper = await brandClipperUsed();
    const equipment = await brandEquipmentUsed();
    const relaxer = await brandRelaxerUsed();
    const operationalDay = await operationalDays();
    res.status(200).render('../salon/analysis', {
        firstPage: firstpage, timing: timing, staffs: staffNums, equipment: equipment,
        officer: officers, brandExtension: brandExtension, brandCream: brandCream, isAc: isAc, brandClipper: brandClipper,
        relaxer: relaxer, operationalDay: operationalDay
    });
});

route.get('/table', async (req, res) => {
    const salon = await Saloon.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).render('../salon/table', { input: salon });
});

route.get('/delete/:id', async (req, res) => {
    const salon = await Saloon.destroy({ where: { id: req.params.id } });
    res.status(200).redirect('/salon/table');
});

route.get('/:id', async (req, res) => {
    const officers = await Saloon.findAll({
        attributes: [
            [Sequelize.fn('DISTINCT', Sequelize.col('officer')), 'officer']],
        raw: true,
    });
    const salon = await Saloon.findOne({ where: { id: req.params.id } });
    res.status(200).render('../salon/edit', { input: salon, alert: [], officers: officers.map((e) => e.officer).join(', ') });
});

function queryPromise(powderName, ) {
    return new Promise((resolve, reject) => {
        Powder.create({'name': powderName, count: 0})
        .then(() => resolve())
        .catch((err) => reject(err));
    });
}

async function executePowder(items) {
    await Promise.all(
        items.map((_, i) => {
            return queryPromise(
                ``
            );
        })
    );
}

module.exports = route;