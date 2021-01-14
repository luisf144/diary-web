const db = require('../models');
const Sequelize = require('sequelize');
const moment = require('moment');
const { getLastPostByUser } = require('../controllers/post.controller');
const helperFunction = require('../helpers/helperFunction');
const { uploadFileMiddleware, deleteFileMiddleware } = require("../middleware/handlerFile.middleware");
const Image = db.images;
const sequelize = db.sequelize;

exports.getListImagesByUser = async (req, res) => {
    const id = parseInt(req.params.id);

    Image.findAll({ where: { userId: id }, raw: true })
        .then(images => {
            res.json(helperFunction.responseHandler(
                true, 200, null, images
            ));
        })
        .catch(err => {
            res.json(helperFunction.responseHandler(
                false,
                500,
                err.message || "Some error occurred while retrieving the images.",
                null
            ));
        });
}

exports.getRandomImage = async (req, res, next) => {
    const posts = getLastPostByUser(req.user.id);

    posts.then((post) =>{
        if(post){
            const createdAt = moment(posts.createdAt).format("YYYY-MM-DD");
            const now = moment().format("YYYY-MM-DD");

            //Check if the user already create a post (comment) during the day
            if(createdAt < now){
                findImageRandom(res, next);
            }else{
                res.json(helperFunction.responseHandler(
                    false,
                    200,
                    "User has already create a post",
                    null
                ));
            }
        }else{
            //The user doesn't have posts so we allow to create
            findImageRandom(res, next);
        }
    });
}

function findImageRandom(res, next){
    return Image.findAll({ order: Sequelize.literal('rand()'), limit: 1 })
        .then(images => {

            if(images && images.length){
                res.json(helperFunction.responseHandler(
                    true, 200, null, images[0]
                ));
            }else{
                res.json(helperFunction.responseHandler(
                    true, 200, "No Images available", null
                ));
            }

            return next();
        })
        .catch(err => {
            res.json(helperFunction.responseHandler(
                false,
                500,
                err.message || "Some error occurred while retrieving the image.",
                null
            ));
        });
}

// delete an Image
exports.delete = async (req, res, next) => {
    const id = parseInt(req.params.id);

    //Find the fileName with id of img provided
    const imageDB = await findImageById(id);

    try{
        //Delete image from fs
        await deleteFileMiddleware(retrieveImgPath(imageDB.name));

        //Delete image record from DB
        deleteImageDB(res, id);

        res.json(helperFunction.responseHandler(
            true, 200, 'Image deleted successfully!', null
        ));

        return next();
    } catch (error) {
        res.json(helperFunction.responseHandler(
            false,
            500,
            `Could not delete the file, imgId: ${id}. ${error}`,
            null
        ));

        return next(error);
    }
};

// create and save a new image
exports.create = async (req, res, next) => {
    try {
        const resFile = await upload(req, res);

        if(resFile){
            // create a new image instance
            const image = {
                name: resFile.originalname,
                userId: req.user.id
            };

            //begin database transaction
            const t = await sequelize.transaction();

            // save the user in the database
            await Image.create(image, {transaction: t}).then((data) => {
                t.commit();

                res.json(helperFunction.responseHandler(
                    true, 200, 'Image created successfully!', data
                ));

            }).catch((err) => {
                t.rollback();
                res.json(helperFunction.responseHandler(
                    false,
                    500,
                    err.message || "An error occurred creating an image",
                    null
                ));
            });
        }

        return next();
    } catch (error) {
        return next(error);
    }
}

//Handling upload file
const upload = async (req, res) => {
    try {
        //using middleware to process
        await uploadFileMiddleware(req, res);

        if (req.file === undefined) {
            res.json(helperFunction.responseHandler(
                false, 400, "Please upload a file!", null
            ));
        }

        return req.file;

    } catch (err) {
        console.log(err);

        if (err.code === "LIMIT_FILE_SIZE") {
            res.json(helperFunction.responseHandler(
                false, 500, "File size cannot be larger than 2MB!", null
            ));
        }

        res.json(helperFunction.responseHandler(
            false,
            500,
            `Could not upload the file: ${req.file.originalname}. ${err}`,
            null
        ));
    }
};

function retrieveImgPath(fileName){
    return __basedir + "/resources/static/assets/uploads/" + fileName;
}

function findImageById(imgId){
    return Image.findByPk(imgId, {raw : true})
        .then((img) => {
            return img;
        })
        .catch((err) => {
            console.log(">> Error while finding image in DB: ", err);
        });
}

function deleteImageDB(res, id){
    //Delete record of img
    Image.destroy({
        where: { id: id }
    })
        .then(num => {
            //num of record deleted
            if (num !== 1) {
                res.json(helperFunction.responseHandler(
                    false, 400, `Cannot delete Image with id=${id}.`, null
                ));
            }
        })
        .catch(err => {
            res.json(helperFunction.responseHandler(
                false, 500, `Internal Err, Cannot delete Image with id=${id}.`, null
            ));
        });
}