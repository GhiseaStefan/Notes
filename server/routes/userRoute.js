const router = require('express').Router();
const { registerUser, loginUser, isUserAuthenticated, logoutUser } = require('../controllers/userController');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/authentication').get(isUserAuthenticated);
router.route('/logout').get(logoutUser);

module.exports = router;