const express = require("express");
const route = express.Router();
const passport = require("passport");
const Saloon = require("../../model/salon/salon.model");
require('../../config/google.config');
const Sequelize = require('sequelize');
const { isGoogleAuthenticated } = require("../../utils/helper.util");

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

    console.log();
    res.status(200).render('../salon/index', { alert: [], officers: officers.map((e) => e.officer).join(', ') });
});

route.post('/submit', (req, res) => {
    var services = [];
    const { hair_styling, manicure, pedicure, lash, brows, micro, make_up, spa, hair_cut, hair_lock, hair_cuts, all_of_the_above } = req.body;
    if (all_of_the_above === 'on') {
        req.body.service_type = 'all of the above';
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
    }
   return Saloon.findAll({
        attributes: [
            [Sequelize.fn('DISTINCT', Sequelize.col('officer')), 'officer']],
        raw: true,
    }).then((salon) => {

    });
    
});

route.get('/table', async (req, res) => {
    const salon = await Saloon.findAll({});
    res.status(200).render('../salon/table', { input: salon });
});

route.get('/delete/:id', async (req, res) => {
    const salon = await Saloon.destroy({ where: { id: req.params.id } });
    res.status(200).redirect('/salon/table');
});

route.get('/:id', async (req, res) => {
    const salon = await Saloon.findOne({ where: { id: req.params.id } });
    res.status(200).render('../salon/edit', { input: salon, alert: [] });
});

module.exports = route;