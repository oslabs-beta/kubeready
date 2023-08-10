const express = require('express');

const CookieController = {
  // Set the cookie and send it
  setCookie: (req, res, next) => {
    res.cookie('token', res.locals.user.id, { httpOnly: true });
    return next();
  },
};

module.exports = CookieController;
