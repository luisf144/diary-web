module.exports = (sequelize, Sequelize) => {
    const Images = sequelize.define("images", {
        name: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    });

    return Images;
};