module.exports = (sequelize, Sequelize) => {
    const Notifications = sequelize.define("notifications", {
        message: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        refId: {
            type: Sequelize.INTEGER
        }
    }, {
        timestamps: false
    });

    return Notifications;
};