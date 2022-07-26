const express = require('express');
const route = express.Router();
const passport = require('passport');
const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const { uuid } = require('uuidv4')
const { isAuthenticated } = require('../utils/helper.util');
const { sendLink } = require('../config/nodemailer-config');

route.get('/', isAuthenticated, async(req, res, next) => {
    if (req.user.trade === 'Logistics') {
        return require('../controller/logistic.controller').logisticIndex(req, res, next);
    }
    if (req.user.trade === 'Plastics') {
        return require('../controller/plastic.controller').plasticIndex(req, res, next);
    }
    if (req.user.trade === 'Commodity') {
        return require('../controller/commodity.controller').commodityIndex(req, res, next);
    }
});

route.get('/recent/:id', isAuthenticated, async(req, res, next) => {
    if (req.user.trade === 'Logistics') {
        return require('../controller/logistic.controller').recentId(req, res, next);
    }
    if (req.user.trade === 'Plastics') {
        return require('../controller/plastic.controller').recentId(req, res, next);
    }
})

route.get('/add', isAuthenticated, (req, res, next) => {
    if (req.user.trade === 'Logistics') {
        return require('../controller/logistic.controller').addItem(req, res, next);
    }
    if (req.user.trade === 'Plastics') {
        return require('../controller/plastic.controller').addItem(req, res, next);
    }
    if (req.user.trade === 'Commodity') {
        return require('../controller/commodity.controller').addItem(req, res, next);
    }
})

route.post('/add', isAuthenticated, async(req, res, next) => {
    if (req.user.trade === "Logistics") {
        req.user.createLogistic(req.body);
    }
    if (req.user.trade === "Plastics") {
        req.user.createPlastic(req.body);
    }
    if (req.user.trade === "Commodity") {
        req.user.createCommodity(req.body);
    }
    return res.status(200).redirect('/table');
})

route.get('/table', isAuthenticated, async(req, res, next) => {
    if (req.user.trade === "Logistics") {
        return require('../controller/logistic.controller').getTable(req, res, next);
    }
    if (req.user.trade === "Plastics") {
        return require('../controller/plastic.controller').getTable(req, res, next);
    }
    if (req.user.trade === "Commodity") {
        return require('../controller/commodity.controller').getTable(req, res, next);
    }
})

route.get('/chart', isAuthenticated, async(req, res, next) => {
    if (req.user.trade === "Logistics") {
        return require('../controller/logistic.controller').getCharts(req, res, next);
    }

    if (req.user.trade === "Plastics") {
        return require('../controller/plastic.controller').getCharts(req, res, next);
    }
})

route.get('/delete/:id', isAuthenticated, async(req, res, next) => {
    if (req.user.trade === 'Logistics') {
        return require('../controller/logistic.controller').deleteItem(req, res, next);
    }

    if (req.user.trade === 'Plastics') {
        return require('../controller/plastic.controller').deleteItem(req, res, next);
    }
})

//===============================AUTHENTICATION MODE===========================================

route.get('/register', async(req, res, next) => {
    return res.status(200).render('../auths/register');
});

route.post('/register', async(req, res, next) => {
    const { password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(password, salt);

    User.create(req.body).then((user) => {
        if (user) {
            return res.status(200).redirect('/login');
        }
        return res.status(404).redirect('/404');
    }).catch((err) => console.log(err));
});

route.get('/login', (req, res, next) => {
    return res.status(200).render('../auths/login');
})

route.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }), (req, res, next) => {
    return res.status(200).redirect('/');
});

route.get('/forget-password', (req, res, next) => {
    return res.status(200).render('../auths/forgot');
})

route.post('/forget-password', async(req, res, next) => {
    const { email } = req.body;
    const token = uuid();
    let user = await User.findOne(req.body);
    if (user) {
        user.token = `${token}`;
        user.save();
        let sentEmail = sendLink(`http://192.168.100.10:4000/reset-password?id=${token}}`, email);
        if (sentEmail) {
            return res.status(202).redirect('/login');
        }
        return res.status(404).redirect('/404');
    }
    return res.status(404).redirect('/404');
})

route.post('/update', isAuthenticated, async(req, res, next) => {
    req.user.business_name = req.body.business_name;
    req.user.save();
    return res.status(200).redirect('/profile');
})

route.get('/reset-password', async(req, res, next) => {
    const { id } = req.query;
    return User.findOne({ where: { token: id } }).then((user) => {
        if (user) {
            return res.status(200).render('../auths/renew', { token: id });
        }
    });
})

route.post('/reset-password', async(req, res, next) => {
    const { password, renew, id } = req.body;

    if (renew == password) {
        const salt = bcrypt.genSaltSync(10);
        req.body.password = bcrypt.hashSync(password, salt);
        return User.findOne({ where: { token: id } }).then((user) => {
            if (!user) {
                return res.status(404).redirect('/404');
            }
            user.password = req.body.password;
            user.token = null;
            user.save();
            return res.status(200).redirect('/');
        }).catch((err) => console.log(err));
    } else {
        return res.status(404).json({ message: 'password does not match' })
    }
})

route.get('/logout', isAuthenticated, (req, res, next) => {
    req.logout((err) => {
        if(err)
    });
   
})

route.get('/profile', isAuthenticated, async(req, res, next) => {
    const user = await User.findOne({ where: { id: req.user.id } });
    return res.status(200).render('../auths/profile', { user: user, title: 'Profile' })
})

route.post('/change-pass', isAuthenticated, async(req, res, next) => {
    if (bcrypt.compareSync(req.body.old_pass, req.user.password)) {
        const { password, c_password } = req.body;
        if (password == c_password) {
            const salt = bcrypt.genSaltSync(10);
            req.body.password = bcrypt.hashSync(password, salt);
            return User.findOne({ where: { id: req.user.id } }).then((user) => {
                if (!user) {
                    return res.status(404).redirect('/404');
                }
                user.password = req.body.password;
                user.save();
                return res.status(200).render('../auths/profile', { user: user, title: 'Profile' })
            }).catch((err) => console.log(err));
        }
        return res.status(404).redirect('/404');
    }
    return res.status(404).redirect('/404');
});

route.get('/404', (req, res, next) => {
    return res.status(404).render('../auths/404');
})


module.exports = route;