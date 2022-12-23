const express = require("express");
const route = express.Router();
const passport = require("passport");
const Saloon = require("../../model/salon/salon.model");
require('../../config/google.config');
const Sequelize = require('sequelize');
const { isGoogleAuthenticated } = require("../../utils/helper.util");
const { firstPage, openingClosing, staffNumbers } = require("../../chartQuery/salon.query");

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
    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = req.body;
    //===================================================
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
    return Saloon.findAll({
        attributes: [
            [Sequelize.fn('DISTINCT', Sequelize.col('officer')), 'officer']],
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
                return res.status(200).render('../salon/index', { alert: msg, officers: officers.map((e) => e.officer).join(', ') });
            }).catch((err) => {
                const msg = [];
                msg.push({ msg: `Unable to insert record ${err}`, err: true });
                req.body = {};
                return res.status(500).render('../salon/index', { alert: msg, officers: officers.map((e) => e.officer).join(', ') });
            });
        }
    });
});

route.get('/chart', async (req, res) => {
    const firstpage = firstPage();
    const timing = await openingClosing();
    const staffNums = await staffNumbers();
    console.log(staffNums);
    res.status(200).render('../salon/analysis', { firstPage: firstpage, timing: timing, staffs: staffNums });
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

module.exports = route;