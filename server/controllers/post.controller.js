const db = require('../models');
const helperFunction = require('../helpers/helperFunction');
const {validationResult} = require('express-validator');
const {validationError} = require('../helpers/helperFunction');
const Post = db.posts;
const sequelize = db.sequelize;

// create and save a new post
exports.create = async (req, res, next) => {
    try {
        // create a new image instance
        const post = {
            comment: req.body.comment,
            score: req.body.score,
            userId: req.user.id,
            imageId: req.body.imageId
        };

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            //begin database transaction
            const t = await sequelize.transaction();

            // save the user in the database
            await Post.create(post, {transaction: t}).then((data) => {
                t.commit();

                res.json(helperFunction.responseHandler(
                    true, 200, 'Post created successfully!', data
                ));

            }).catch((err) => {
                t.rollback();
                res.json(helperFunction.responseHandler(
                    false,
                    500,
                    err.message || "An error occurred creating the Post",
                    null
                ));
            });

            return next();
        }else{
            validationError(errors, res);
        }

    } catch (error) {
        return next(error);
    }
}

//Get Last 5 records of Post for userId
exports.getPostsByUser = async (req, res) => {
    const id = parseInt(req.user.id);

    Post.findAll({
        include: ['image'],
        where: { userId: id },
        order: [ [ 'id', 'DESC' ]],
        limit: 5,
    })
        .then(posts => {
            res.json(helperFunction.responseHandler(
                true, 200, null, posts
            ));
        })
        .catch(err => {
            res.json(helperFunction.responseHandler(
                false,
                500,
                err.message || "Some error occurred while retrieving the posts.",
                null
            ));
        });
}

exports.getLastPostByUser = id => {
    return Post.findOne({
        where: { userId: id },
        order: [ [ 'id', 'DESC' ]],
        limit: 1,
        raw: true
    })
        .then(posts => {
            return posts;
        })
        .catch(err => {
            return err;
        });
};