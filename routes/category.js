const express = require('express');
const router = express.Router();
var cors = require('cors');

const helpers = require('../helpers/category');


router.route('/')
      .get(cors(),helpers.getCategories)

      
router.route('/:id')
      .get(cors(), helpers.getCategory)    


module.exports = router;