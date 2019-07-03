// Packages
const express = require('express');


// Custom modules
const carController = require('../controllers/car');
const { authenticate } = require('../middlewares/authenticate');
const { createAccess, readAccess, updateAccess } = require('../middlewares/access-right');

const router = express.Router();

router.get('/', carController.getCars);
router.post('/', [authenticate, createAccess], carController.postCar);
router.get('/:id', [authenticate, readAccess], carController.getCar);
router.put('/:id', [authenticate, updateAccess], carController.updateCar);

module.exports = router;