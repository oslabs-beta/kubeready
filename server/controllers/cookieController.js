const express = require('express');

const CookieController = {
  setCookie: (req, res, next) => {
    res.cookie('token', res.locals.user.id, { httpOnly: true });
    return next();
  },
};

module.exports = CookieController;
