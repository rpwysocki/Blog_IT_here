const view_routes = require('./view_routes'); 
const express = require('express');

const router = express.Router();

router.use('/', view_routes);

module.exports = router;