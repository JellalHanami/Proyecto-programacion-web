const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { model } = require('../config/db');

router.post('/auth/login', authController.login);

module.exports = router;