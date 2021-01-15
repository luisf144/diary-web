require('dotenv').config();

const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//include all the models
db.users = require('./user.model.js')(sequelize, Sequelize);
db.images = require('./image.model.js')(sequelize, Sequelize);
db.posts = require('./post.model.js')(sequelize, Sequelize);
db.notifications = require('./notification.model.js')(sequelize, Sequelize);

db.posts.belongsTo(db.images, {
    foreignKey: "imageId",
    as: "image",
});

db.posts.belongsTo(db.users, {
    foreignKey: "userId",
    as: "user",
});

db.users.hasMany(db.images, { as: "images" });
db.images.belongsTo(db.users, {
    foreignKey: "userId",
    as: "user",
});

module.exports = db;
