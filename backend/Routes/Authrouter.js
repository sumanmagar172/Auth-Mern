const {signup, login} = require('../Controllers/Authcontroller');
const { signupValidation, loginValidation } = require('../Middlewares/Authvalidation');

const express = require('express');

const router = express();

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);

module.exports = router;    