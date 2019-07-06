// Packages
const express = require('express');
const router = express.Router();

// custom modules
const customersController = require('./../controllers/customer');


router.get('/', customersController.getCustomers);
router.post('/', customersController.postCustomer);
router.put('/:id', customersController.updateCustomer);

module.exports = router;