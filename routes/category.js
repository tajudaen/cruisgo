// Packages
const express = require('express');


// Custom modules
const categoryController = require('../controllers/category');

const router = express.Router();

router.get('/', categoryController.getCategories);
router.post('/', categoryController.postCategory);
router.get('/:id', categoryController.getCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;