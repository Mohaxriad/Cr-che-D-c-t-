const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const requireAuth = require('../middleware/verifyJWT');


router.route('/signup').post(authController.signup);
router.route('/').post(authController.login);
router.route('/refresh').get(authController.refresh);
router.route('/logout').get(requireAuth,authController.logout);
router.route('/forgotPassword').post(authController.forgotPassword);
router.route('/resetPassword/:token').patch(authController.resetPassword);
router.route('/changePassword').patch(requireAuth,authController.changePassword);
router.route('/verifyEmail/:confirmationToken').patch(authController.verifyEmail);
router.route('/update').patch(requireAuth,authController.updateUser);

module.exports = router;
