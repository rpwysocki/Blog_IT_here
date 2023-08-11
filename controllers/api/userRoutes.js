const router = require('express').Router();
const User = require('../../models/User');

// Login User
router.post('/login', async (req, res) => {
    try {
console.log(req.body);

        const user = await User.findOne({ where: { userName: req.body.userName } });

        if (!user) {
            res.status(400).json({ message: 'An account with that username does not exist' })
        }
        // Validate that the password is correct
        const isValidPass = await user.validatePass(req.body.password);

        if (!isValidPass) {
            res.status(400).json({ message: 'Incorrect password' });
            return;
        }


        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.logged_in = true;

           res.json({message: 'you are logged in'})
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err });
    }
});

// Register User
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
        console.log(err);
       res.status(500).json({message: 'Username already exists'})
        // // if username already exists
        // if (dupeName) res.json({ error: 'Username already exists' })
    }
});

// Logout
router.post('/logout', (req, res) => {
    if(req.session.logged_in){
        req.session.destroy(()=>{
            res.status(204).end()
        })
    }else{
        res.status(404).end()
    }
   
});


module.exports = router;