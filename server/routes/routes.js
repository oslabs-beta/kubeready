//require in express
const express = require('express');
const router = express.Router();
const userController = require('../controllers/authController.js');

router.post('/login', userController.createUser, (req, res) => {
  return res.status(201).json();
});

module.exports = router;
