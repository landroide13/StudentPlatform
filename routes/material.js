const express = require('express');
const router = express.Router();
var cors = require('cors');

const helpers = require('../helpers/material');

router.route('/')
      .get(cors(), helpers.getArticles)

router.route('/:id')
      .get(cors(),helpers.getArticle)
         

module.exports = router;
























