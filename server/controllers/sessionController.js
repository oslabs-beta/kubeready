const Session = require('../models/sessionModel');

const SessionController = {
  startSession: async (req, res, next) => {
    try {
      await Session.findOneAndUpdate(
        { cookieId: res.locals.user.id },
        { createdAt: Date.now() },
        { upsert: true, setDefaultsOnInsert: true }
      );
      return next();
    } catch {
      return next({
        log: 'Error occured in sessionController.startSession',
        status: 500,
        message: 'An error occured in creating/ finding cookie',
      });
    }
  },
  checkCookie: (req, res, next) => {
    const { cookieId } = req.cookies;
    Session.findOne({ cookieId })
      .then((cookie) => {
        if (req.cookies.token === cookie) {
          res.locals.hasCookie = true;
        } else {
          res.locals.hasCookie = false;
        }
        return next();
      })
      .catch((error) => {
        return next({
          log: 'Error occured in sessionController.checkCookie',
          status: 500,
          message: 'An error occured in finding cookie',
        });
      });
  },
};

module.exports = SessionController;
