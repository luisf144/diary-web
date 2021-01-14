const util = require("util");
const fs = require('fs');
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

//Unlink files
const unlinkAsync = util.promisify(fs.unlink)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + "/resources/static/assets/uploads/");
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, file.originalname);
    },
});

const uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).single("file");

const uploadFileMiddleware = util.promisify(uploadFile);
const deleteFileMiddleware = async function(pathFile){
    return await unlinkAsync(pathFile)
};

module.exports = {
    uploadFileMiddleware,
    deleteFileMiddleware
};