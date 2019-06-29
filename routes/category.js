// Packages
const express = require('express');


// Custom modules
const categoryController = require('../controllers/category');
const { authenticate } = require('../middlewares/authenticate');
const { access } = require('../middlewares/access-right');

const router = express.Router();

router.get('/', categoryController.getCategories);
router.post('/', [authenticate, access], categoryController.postCategory);
router.get('/:id', categoryController.getCategory);
router.put('/:id', authenticate, categoryController.updateCategory);
router.delete('/:id', authenticate, categoryController.deleteCategory);

module.exports = router;