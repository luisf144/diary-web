module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        role: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        token: {
            type: Sequelize.STRING
        }
    },  {
        timestamps: false
    });

    return User;
};
