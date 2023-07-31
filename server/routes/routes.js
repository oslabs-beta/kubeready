//require in express
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController.js');

router.post('/login', UserController.createUser, (req, res) => {
  console.log('reached routes.js after UserController.createUser middleware')
  return res.status(201).json(res.locals.createdUser);
});

module.exports = router;
