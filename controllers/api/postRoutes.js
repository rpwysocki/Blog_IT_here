const express = require('express');

const router = express.Router();
const {Post} =  require('../../models')



router.post('/',  async (req, res) => {
    try {

        const newPost = await Post.create({
            title: req.body.title,
            text: req.body.text,
            user_id: req.session.user_id
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id',  async (req, res) => {
    try {
        const post = await Post.destroy({ where:
        {
            id: req.params.id,
        
        }
     });

        if(!post){
            res.status(404).json({message: 'No post found with that id'});
            return;
        }

        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;