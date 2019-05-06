const express = require('express');
const { check } = require('express-validator/check');

const authController = require('../controllers/authController');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

router.get('/signup', authController.getSignup);

router.post('/signup',
    check('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom((value, { req }) => {
            if (value === 'test@mailinator.com') {
                throw new Error('This email address is forbidden.');
            }

            return true;
        }),
    authController.postSignup);

router.post('/logout', isAuth, authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/new-password/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
