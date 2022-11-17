const express = require('express');
const router = express.Router();

const helpers = require('../helpers/material');

router.route('/')
      .get(helpers.getArticles)

router.route('/:id')
      .get(helpers.getArticle)
         

module.exports = router;
























