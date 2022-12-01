const express = require("express");
const route = express.Router();
const Saloon = require("../../model/salon/salon.model");

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
            services.push('hair_styling');
        if (manicure === 'on')
            services.push('manicure');
        if (pedicure === 'on')
            services.push('pedicure');
        if (lash === 'on')
            services.push('lash');
        if (make_up === 'on')
            services.push('make_up');
        if (spa === 'on')
            services.push('spa');
        if (hair_cut === 'on')
            services.push('hair_cut');
        if (hair_lock === 'on')
            services.push('hair_lock');
        if (hair_cuts === 'on')
            services.push('hair_cuts');
        if (brows === 'on')
            services.push('brows');
        if (micro === 'on')
            services.push('micro blading');
        req.body.service_type = services.join(', ');
    }
    return Saloon.create(req.body).then(() => {
        const msg = [];
        msg.push({ msg: "Record Successfully Inserted", err: false });
        return res.status(200).render('../salon/index', { alert: msg });
    }).catch((err) => {
        const msg = [];
        msg.push({ msg: `Unable to insert record ${err}`, err: true });
        return res.status(500).render('../salon/index', { alert: msg });
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
    const salon = await Saloon.destroy({ where: { id: req.params.id } });
    res.status(200).redirect('/salon/table');
});


module.exports = route;