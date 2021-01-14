const express = require('express');
const router = express.Router();
const { checkValidation } = require('../validators/user.validate');
const { auth } = require('../middleware/auth.middleware');
const usersController = require('../controllers/user.controller');

/** @route      POST /api/users/register
 *  @desc       register a new user
 *  @access     Private
 */
router.post('/register',
    checkValidation('create'),
    usersController.create
);

/** @route      POST /api/users/login
 *  @desc       log in user
 *  @access     Private
 */
router.post('/login',
    checkValidation('login'),
    usersController.login
);

/** @route      POST /api/users/auth
 *  @desc       check user logged in
 *  @access     Private
 */
router.get('/auth',
    auth,
    usersController.authenticate
);

/** @route      POST /api/users/logout
 *  @desc       log out user
 *  @access     Private
 */
router.get('/logout',
    auth,
    usersController.logout
)

module.exports = router;
