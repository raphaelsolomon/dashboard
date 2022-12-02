const express = require("express");
const route = express.Router();
const Saloon = require("../../model/salon/salon.model");


route.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

route.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/salon/dashboard',
    failureRedirect: '/salon/login'
}));

route.get('/login', (req, res, next) => {
    res.json('')
})

route.get("/dashboard", checkAuthenticated, (req, res) => {
    res.json("dashboard.ejs", { name: req.user.displayName })
})

route.get('/', (req, res) => {
    res.status(200).render('../salon/index', { alert: [] });
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

    if (req.body.id !== undefined) {
        return Saloon.findOne({ where: { id: req.body.id } }).then((e) => {
            return e.update(req.body).then((result) => {
                const msg = [];
                msg.push({ msg: "Record Successfully Updated", err: false });
                return res.status(200).render('../salon/edit', { input: result, alert: msg });
            }).catch((err) => {
                const msg = [];
                msg.push({ msg: `Unable to insert record ${err}`, err: true });
                return res.status(200).render('../salon/edit', { input: result, alert: msg });
            });
        });
    } else {
        return Saloon.create(req.body).then(() => {
            const msg = [];
            msg.push({ msg: "Record Successfully Inserted", err: false });
            return res.status(200).render('../salon/index', { alert: msg });
        }).catch((err) => {
            const msg = [];
            msg.push({ msg: `Unable to insert record ${err}`, err: true });
            return res.status(500).render('../salon/index', { alert: msg });
        });
    }
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

checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) { return next() }
    res.redirect("/login")
}


module.exports = route;