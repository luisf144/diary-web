const users = require('./user.routes');
const images = require('./image.routes');
const posts = require('./post.routes');
const notifications = require('./notification.routes');

const express = require('express');
const router = express.Router();

router.use('/users', users);
router.use('/images', images);
router.use('/posts', posts);
router.use('/notifications', notifications);

module.exports = router;