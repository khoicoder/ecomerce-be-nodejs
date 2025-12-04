'use strict';

const express = require('express');
const router = express.Router();

const AccessController = require('../../../controllers/access.controller');

// SIGN UP
router.post('/signup', AccessController.signUp);

// SIGN IN (nếu có)
// router.post('/login', AccessController.login);

module.exports = router;
