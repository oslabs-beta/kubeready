const express = require('express');
// const cookieParser = require('cookie-parser');

const CookieController = {
  setCookie: (req, res, next) => {
    console.log('We entered setCookie in the Cookie Controller');
    res.cookie('token', res.locals.user.id, { httpOnly: true });
    console.log('cookie has been made!');
    return next();
  },
};

module.exports = CookieController;
