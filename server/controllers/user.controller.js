const db = require('../models');
const {validationResult} = require('express-validator');
const {validationError, responseHandler} = require('../helpers/helperFunction');
const bcrypt = require('bcrypt');
const User = db.users;
const jwt = require('jsonwebtoken');
const sequelize = db.sequelize;

const SALT_ROUNDS = 10;


// create and save a new user
exports.create = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            const salt = bcrypt.genSaltSync(SALT_ROUNDS);
            const hashedPassword = bcrypt.hashSync(req.body.password, salt);

            // create a new user instance
            const user = {
                email: req.body.email,
                password: hashedPassword,
                role: req.body.role
            };

            //begin database transaction
            const t = await sequelize.transaction();

            // save the user in the database
            await User.create(user, {transaction: t}).then((data) => {
                t.commit();

                res.json(responseHandler(
                    true,
                    200,
                    "User registered successfully!",
                    {"registered": true}
                ));

            }).catch((err) => {
                t.rollback();
                res.json(responseHandler(
                    false,
                    500,
                    err.message || "An error occurred registering the user",
                    null
                ));
            });

            return next();
        } else {
            validationError(errors, res);
        }
    } catch (error) {
        return next(error);
    }
}

// user login
exports.login = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            const user = await User.findOne({where: {email: req.body.email}});
            if (user) {
                const password = bcrypt.compareSync(req.body.password, user.password);
                if(password) {
                    //res.send(user);
                    const getToken = jwt.sign(user.id.toString(16), 'secret');
                    const t = await sequelize.transaction();

                    if (getToken) {
                        user.token = getToken;

                        //save transaction
                        await user.save({transaction: t});
                        t.commit();
                        
                        res.cookie("x_auth", user.token).status(200).json(
                            responseHandler(
                                true,
                                200,
                                "Login successfully!",
                                {"loggedIn": true}
                            )
                        );
                    } else {
                        t.rollback();
                        return res.json(responseHandler(
                            false,
                            500,
                            "Failed to generate token",
                            null
                        ));
                    }
                } else {
                    return res.json(responseHandler(
                        false,
                        500,
                        "Authentication failed, password didn't match",
                        null
                    ));
                }
            } else {
                return res.json(responseHandler(
                    false,
                    500,
                    "Authentication failed, email not found",
                    null
                ));
            }
        } else {
           validationError(errors, res);
        }
    } catch (error) {
        return next(error);
    }
}

// Wrapper the response on authenticating the user
exports.authenticate = (req, res)  => {
    res.status(200).json({
        id: req.user.id,
        isAuth: true,
        email: req.user.email,
        isAdmin: req.user.role === 2
        // role: req.user.role
    });
}

// logout function
exports.logout = async (req, res) => {
    await User.findByPk(req.user.id)
        .then((user) => {
            user.token = null;
            user.save();

            return res.json(responseHandler(
                true,
                200,
                "User logout successfully!",
                null
            ));

        }).catch((err) => {
            return res.json(responseHandler(
                false,
                500,
                "Failed to logout",
                err
            ));
        });
}
