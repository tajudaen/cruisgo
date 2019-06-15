// Packages
const express = require('express');


// Custom modules
const categoryController = require('../controllers/category');

const router = express.Router();

router.get('/', categoryController.getCategories);

module.exports = router;