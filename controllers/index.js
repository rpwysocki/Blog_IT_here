const view_routes = require('./view_routes'); 
const express = require('express');
const api = require('./api');

const router = express.Router();

router.use('/api', api);
router.use('/', view_routes);

module.exports = router;