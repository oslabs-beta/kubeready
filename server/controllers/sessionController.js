const Session = require('../models/sessionModel');

const SessionController = {
  startSession: async (req, res, next) => {
    console.log('We entered the Session Controller startSession');
    try {
      await Session.findOneAndUpdate(
        { cookieId: res.locals.user.id },
        { createdAt: Date.now() },
        { upsert: true, setDefaultsOnInsert: true }
      );
      console.log('executed findOneAndUpdate');
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
    console.log('we entered sessionController.checkCookie');
    const { cookieId } = req.cookies;
    console.log('cookieId looks like this: ', cookieId);
    Session.findOne({ cookieId })
      .then((cookie) => {
        console.log('req.cookies.token looks like this:', req.cookies);
        if (req.cookies.token === cookie) {
          res.locals.hasCookie = true;
          console.log('added onto res.locals.hasCookie');
        } else {
          res.locals.hasCookie = false;
        }
        return next();
      })
      .catch((error) => {
        console.log('encountered error in checkCookie');
        return next({
          log: 'Error occured in sessionController.checkCookie',
          status: 500,
          message: 'An error occured in finding cookie',
        });
      });
  },
};

module.exports = SessionController;

// isLoggedIn : (req,res,next) => {
//     Session.findOne({ cookieID: res.cookies.ssid }, {
//         (err, session) => {
//             if(err){
//                 return next({
//                     log: 'Error occured in sessionController.isLoggedIn',
//                     status: 500,
//                     message: {err: 'An error occured'}
//                 });
//             }else if (!session){
//                 return res.redirect('/')
//             }
//         }
//     })
// }
