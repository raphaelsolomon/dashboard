const express = require("express");
const Fort = require("../model/fort.model copy");
const route = express.Router();

route.get('/', async (req, res) => {
    return res.status(200).render('../fort/index');
})

route.post('/submit', async (req, res) => {
    return Fort.create(req.body).then((_) => {
        return res.status(200).json('succesfully submitted...');
    }).catch((err) => res.status(200).json('error occurred when submitting...'));
})

route.get('/table', async (req, res) => {
    const fort = await Fort.findAll();
    return res.status(200).render('../fort/table', { fort: fort });
})

route.get('/delete/:id', async (req, res) => {
    Fort.destroy({ where: { id: req.params.id } }).then((_) => {
        return res.status(200).json('../fort/');
    });
})
route.get('/:id', async (req, res) => {
    const fort = await Fort.findOne({ where: { id: req.params.id } });
    return res.status(200).render('../fort/index', { input: fort });
})
module.exports = route;  
