const express = require('express');
const router = express.Router();

const controller = require('../../controller/auth');

router.post('/sign-in', controller.loginController);

router.post('/sign-up', controller.signUpController);

module.exports = router;
