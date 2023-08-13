const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const auth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['userName']
                }
            ]
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('index', {
            layout: 'main',
            posts,
            isHome: true,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    res.render('login', {
        layout: 'login'
    })
});

router.get('/register', (req, res) => {
    res.render('register', {
        layout: 'register'
    })
});

router.get('/dashboard', auth, async (req, res) => {

    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            }
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('dashboard', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id
            }
        })
        const commentData = await Comment.findAll({
            where: {
                post_id: req.params.id
            }
        })
        const post = postData.get({ plain: true });
        const comments = commentData.map((comment) => comment.get({ plain: true }));
        res.render('post', {
            logged_in: req.session.logged_in,
            post,
            comments
        })
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
