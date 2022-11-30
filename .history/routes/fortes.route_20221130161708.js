const express = require("express");
const Fort = require("../model/fort.model copy");
const route = express.Router();

route.get('/', async (req, res) => {
    return res.status(200).render('../fort/index');
})

route.post('/submit', async (req, res) => {
    if (req.body.update !== undefined) {
        return Fort.findOne({where: {id: req.body.id}}).then((e) => {
            return e.update(req.body).then((_) => {
                return res.status(200).redirect('../table');
            })
        });
    } else {
        return Fort.create(req.body).then((_) => {
            return res.status(200).json('succesfully submitted...');
        }).catch((err) => res.status(200).json('error occurred when submitting...'));
    }
})

route.get('/table', async (req, res) => {
    const fort = await Fort.findAll();
    return res.status(200).render('../fort/table', { fort: fort });
})

route.get('/delete/:id', async (req, res) => {
    Fort.destroy({ where: { id: req.params.id } }).then((_) => {
        return res.status(200).redirect('//table');
    });
})
route.get('/:id', async (req, res) => {
    const fort = await Fort.findOne({ where: { id: req.params.id } });
    return res.status(200).render('../fort/edit', { input: fort });
})
module.exports = route;  
