const express = require('express');
// const cookieParser = require('cookie-parser');

const CookieController = {
  setCookie: (req, res, next) => {
    console.log('We entered setCookie in the Cookie Controller');
    res.cookie('ssid', res.locals.user.id, { httpOnly: true });
    return next();
  },
};

module.exports = CookieController;
