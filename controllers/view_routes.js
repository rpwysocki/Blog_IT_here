const express = require('express');

const router = express.Router();

router.get('/', (req,res) => {
    res.render('index', {
        layout: 'main'
    })
});

router.get('/login', (req,res) => {
    res.render('login', {
        layout: 'login'
    })
});

router.get('/register', (req,res) => {
    res.render('register', {
        layout: 'register'
    })
});





module.exports = router;
