const db = require('../models');
const helperFunction = require('../helpers/helperFunction');
const {validationResult} = require('express-validator');
const {validationError} = require('../helpers/helperFunction');
const Post = db.posts;
const Notification = db.notifications;
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;

//Define const bad score
const maxBadScore = 5;

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

                //Find lastScore and check if is a second bad score
                // then send create notification
                const fBadScoreImg = findBadScoreImg(req.body.imageId);

                fBadScoreImg.then(async (post) => {
                    if(post && req.body.score <= maxBadScore){
                        //begin second database transaction
                        const t2 = await sequelize.transaction();

                        //Then create a notification
                        Notification.create({
                            message: "Image received a second bad score.",
                            type: "image_score",
                            refId: req.body.imageId
                        }, {transaction: t2}).then((data) => {
                            t2.commit();
                        });
                    }
                });

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

exports.getPostWhereImgId = async (req, res, next) => {
    const imgId = req.params.id;

    try {
        await Post.findAll({
            where: { imageId: imgId },
            include: ["image", "user"]
        })
            .then(posts => {
                let image = null;
                let imgName = null;
                let comments = [];
                let acScore = 0;

                if(posts && posts.length){
                    imgName = posts[0].image.name;
                    posts.map((post) => {
                        acScore += post.score;
                        if(post.comment){
                            comments.push({
                                author: post.user.email,
                                datetime: post.createdAt,
                                content: post.comment,
                            });
                        }
                    });

                    image = {
                        name: imgName,
                        avgScore: Math.round(acScore / posts.length),
                        comments,
                    };
                }

                res.json(helperFunction.responseHandler(
                    true, 200, null, image
                ));

            })
            .catch(err => {
                res.json(helperFunction.responseHandler(
                    false,
                    500,
                    err.message || "An error occurred retrieving the post",
                    null
                ));
            });

        return next();
    } catch (error) {
        return next(error);
    }
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

function findBadScoreImg(imgId){
    return Post.findAll({
        include: ['image'],
        where: {
            imageId: imgId,
            score: { [Op.lte]: maxBadScore }
        },
        order: [ [ 'id', 'DESC' ]],
        raw: true
    })
        .then(posts => {
            console.log("ciaaaao", posts)
            if(posts && posts.length === 2)
                return posts[0];

            return null;
        })
        .catch(err => {
            return err;
        });
}