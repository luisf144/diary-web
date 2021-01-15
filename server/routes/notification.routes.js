const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth.middleware');
const notificationsController = require('../controllers/notification.controller');

/** @route      GET /api/notifications/
 *  @desc       Get all notifications
 *  @access     Private
 */
router.get('/',
    auth,
    notificationsController.getNotifications
);

module.exports = router;
