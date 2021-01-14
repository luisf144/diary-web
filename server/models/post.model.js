module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("posts", {
        comment: {
            type: Sequelize.STRING(100)
        },
        score: {
            type: Sequelize.INTEGER
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: sequelize.literal('NOW()')
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: sequelize.literal('NOW()')
        }
    });

    return Post;
};