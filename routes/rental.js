// Packages
const express = require('express');

const router = express.Router();

// Custom modules
const rentalsController = require('./../controllers/rental');
const { authenticate } = require('../middlewares/authenticate');
const { readAccess } = require('../middlewares/access-right');

router.get('/', [authenticate, readAccess], rentalsController.getRentals);

router.post('/', authenticate, rentalsController.postRental);

router.post('/returns', authenticate, rentalsController.returns);

module.exports = router;