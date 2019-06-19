// Packages
const express = require('express');

const router = express.Router();

// Custom modules
const authenticationController = require('./../controllers/authentication');

router.post('/register', authenticationController.register);
router.post('/login', authenticationController.login);

module.exports = router;