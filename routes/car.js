// Packages
const express = require('express');


// Custom modules
const carController = require('../controllers/car');
const { authenticate } = require('../middlewares/authenticate');
const { createAccess } = require('../middlewares/access-right');

const router = express.Router();

router.get('/', carController.getCars);
router.post('/', [authenticate, createAccess], carController.postCar);

module.exports = router;