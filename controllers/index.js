const view_routes = require('./view_routes'); 
const express = require('express');
// const api = require('/api');
const postRoutes = require('/api/postRoutes');
const commentRoutes = require('/api/commentRoutes;')
const userRoutes = require('/api/userRoutes');
const router = express.Router();

// router.use('/', api);
router.use('/', view_routes);

module.exports = router;