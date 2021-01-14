const users = require('./user.routes');
const images = require('./image.routes');
const posts = require('./post.routes');

const express = require('express');
const router = express.Router();

router.use('/users', users);
router.use('/images', images);
router.use('/posts', posts);

module.exports = router;