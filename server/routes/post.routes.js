const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth.middleware');
const { check } = require('express-validator');
const postsController = require('../controllers/post.controller');

/** @route      POST /api/posts/new
 *  @desc       Create a new post
 *  @access     Private
 */
router.post('/new',
    [
        check(
            'score',
            'Please enter a valid score. [0-10]'
        ).exists().isLength({ min: 0, max: 10 }),
        check(
            'comment',
            'Maximum Length of comment is 100.'
        ).isLength({ max: 100 }),
        check(
            'imageId',
            'Please enter a img ID'
        ).isInt(),
        auth
    ],
    postsController.create
);

/** @route      GET /api/posts
 *  @desc       Get last 5 posts by UserID
 *  @access     Private
 */
router.get('/',
    auth,
    postsController.getPostsByUser
);

/** @route      GET /api/posts/image/:id
 *  @desc       Get comments for image ID
 *  @access     Private
 */
router.get('/image/:id',
    auth,
    postsController.getPostWhereImgId
);

module.exports = router;
