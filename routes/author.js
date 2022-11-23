const express = require('express');
const router = express.Router();
var cors = require('cors');

const helpers = require('../helpers/author');

router.route('/')
      .get(cors(), helpers.getAuthors)

router.route('/:id')
      .get(cors(),helpers.getAuthor)

  
         
module.exports = router;