const express = require("express");
const route = express.Router();

route.get('/', (req, res) => {
    res.status(200).render('../vulcanizer/vulcanizer', { alert: [] });
})

route.post('/', (req, res) => {
    const msg = [];
    msg.push({ msg: "Record Successfully Inserted", err: false });
    return Vulcanizer.create(req.body).then((vulcanizer) =>
        res.status(200).render('../voters/vulcanizer', { alert: msg })).then((err) => console.log(err));
})


module.exports = route;