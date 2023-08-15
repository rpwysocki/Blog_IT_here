const commentRoutes = require('./commentRoutes');
const postRoutes = require('./postRoutes');
const userRoutes = require('./userRoutes');

const router = require('express').Router();

//we are already at the /api sub route
router.use('/comment', commentRoutes);
router.use('/post', postRoutes);
router.use('/user', userRoutes);

module.exports = router;