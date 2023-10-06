const { express, clearCookie } = require('express');

const LogoutController = {
  deleteCookie: (req, res, next) => {
    res.clearCookie('token');
    return next();
  },
};

module.exports = LogoutController;
