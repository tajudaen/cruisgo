// Packages
const express = require('express');


// Custom modules
const categoryController = require('../controllers/category');
const { authenticate } = require('../middlewares/authenticate');
const { createAccess, readAccess, updateAccess, deleteAccess } = require('../middlewares/access-right');

const router = express.Router();

router.get('/', categoryController.getCategories);
router.post('/', [authenticate, createAccess], categoryController.postCategory);
router.get('/:id', [authenticate, readAccess], categoryController.getCategory);
router.put('/:id', [authenticate, updateAccess], categoryController.updateCategory);
router.delete('/:id', [authenticate, deleteAccess], categoryController.deleteCategory);

module.exports = router;