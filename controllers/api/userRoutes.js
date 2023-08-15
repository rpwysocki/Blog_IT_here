const express = require('express');

const router = express.Router();
const {User} = require('../../models');


router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ where: { userName: req.body.userName } });
        if (!user) return res.redirect("/register");

        const isValidPass = await user.validatePass(req.body.password);

        if (!isValidPass) {
            return res.render("login", {
                isLoginOrRegister: true,
                isLoggedIn: false,
                error: "Invalid password. Please try again.",
            });
        }
        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.logged_in = true;

            res.json({ message: 'You are logged in' })
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.post('/', async (req, res) => {
    try {
        const newUser = await User.create({
            userName: req.body.userName,
            password: req.body.password
        });
        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;
            res.json(newUser);
        });
    } catch (err) {
        res.status(500).json({ message: 'Username already exists' })
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end()
        })
    } else {
        res.status(404).end()
    }
});


module.exports = router;