const express = require('express');
const cookieParser = require('cookie-parser');

const CookieController = {
  setCookie: (req, res, next) => {
    res.cookie('ssid', res.locals.user.id, { httpOnly: true });
    return next();
  },
};

export default CookieController;
