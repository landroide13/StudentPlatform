const express = require('express');
const router = express.Router();

const helpers = require('../helpers/students');


router.route('/register')
    .post(helpers.registerStudent)

router.route('/login')    
    .post(helpers.loginStudent)







module.exports = router;
