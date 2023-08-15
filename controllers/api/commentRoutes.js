const express = require('express');

const router = express.Router();
const { Comment } = require('../../models')

// /api/comment/:id
router.post('/:id', async (req, res) => {
    try {
        const newComment = await Comment.create({
            text: req.body.text,
            user_id: req.session.user_id,
            post_id: req.params.id
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;