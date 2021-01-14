const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth.middleware');
const imagesController = require('../controllers/image.controller');

/** @route      POST /api/images/new
 *  @desc       Create a new image
 *  @access     Private
 */
router.post('/new',
    auth,
    imagesController.create
);

/** @route      DELETE /api/images/:id
 *  @desc       Delete an image
 *  @access     Private
 */
router.delete('/:id',
    auth,
    imagesController.delete
);

/** @route      GET /api/images/user/:id
 *  @desc       Get all images by UserID
 *  @access     Private
 */
router.get('/user/:id',
    auth,
    imagesController.getListImagesByUser
);

/** @route      GET /api/images/random
 *  @desc       Get random image
 *  @access     Private
 */
router.get('/random',
    auth,
    imagesController.getRandomImage
);

module.exports = router;
