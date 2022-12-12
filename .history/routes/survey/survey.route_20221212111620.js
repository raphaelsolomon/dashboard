const express = require("express");
const route = express.Router();

route.get('/', (req, res) => {
    return res.status(200).render('../survey/index', { alert: [{ msg: 'survey loaded successfully', err: true }] });
})

 <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>

module.exports = route;