const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController.js');
const CookieController = require('../controllers/cookieController.js');
const SessionController = require('../controllers/sessionController.js');
// const grafanaController = require('../controllers/grafanaController.js');
// const installController = require('../controllers/installController.js');
const LogoutController = require('../controllers/logoutController.js');

//route handler for a post request to the /signup endpoint
//CREATING A USER ROUTE HANDLER
router.post(
  '/signup',
  UserController.createUser,
  SessionController.startSession,
  CookieController.setCookie,
  (req, res) => {
    return res.status(201).json(res.locals.user);
  }
);

//route handler for a post req to the /login endpoint
router.post(
  '/login',
  UserController.verifyUser,
  // installController.installPrometheus,
  // installController.recreatePromGraf,
  // installController.portForward,
  // // grafanaController.getApiToken,
  // grafanaController.generateDashboard,
  // UserController.addUrls,
  SessionController.startSession,
  CookieController.setCookie,
  (req, res) => {
    return res.status(201).json(res.locals.user);
  }
);

router.get(
  '/logout',
  // LogoutController.deleteCookie,
  (req, res) => {
    return res.status(200).redirect('/').json();
  }
);

module.exports = router;
