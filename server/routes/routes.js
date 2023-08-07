//require in express
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController.js');
const CookieController = require('../controllers/cookieController.js');
const SessionController = require('../controllers/sessionController.js');
const grafanaController = require('../controllers/grafanaController.js');
const installController = require('../controllers/installController.js');

//route handler for a post request to the /signup endpoint
//CREATING A USER
router.post('/signup', UserController.createUser, (req, res) => {
  //console.log('reached routes.js after UserController.createUser middleware')
  return res.status(201).json(res.locals.createdUser);
});

//route handler for a post req to the /login endpoint
router.post(
  '/login',
  UserController.verifyUser,
  // installController.installPrometheus,
  // installController.recreatePromGraf,
  // installController.portForward,
  // grafanaController.generateDashboard,
  // UserController.addUrls,
  SessionController.startSession,
  CookieController.setCookie,
  SessionController.checkCookie,
  (req, res) => {
    return res.status(201).json(res.locals.user);
  }
);

module.exports = router;
