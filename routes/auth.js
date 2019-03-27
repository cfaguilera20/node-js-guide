const express = require('express');

const authController = require('../controllers/authController');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

router.get('/signup', authController.getSignup);

router.post('/signup', authController.postSignup);

router.post('/logout', isAuth, authController.postLogout);

router.get('/reset', authController.getReset);

module.exports = router;
