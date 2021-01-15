const db = require('../models');
const { responseHandler} = require('../helpers/helperFunction');
const Notification = db.notifications;

exports.getNotifications = async (req, res) => {
    Notification.findAll({
        order: [ [ 'id', 'DESC' ]],
    })
        .then(notifications => {
            res.json(responseHandler(
                true, 200, null, notifications
            ));
        })
        .catch(err => {
            res.json(responseHandler(
                false,
                500,
                err.message || "Some error occurred while retrieving notifications.",
                null
            ));
        });
}