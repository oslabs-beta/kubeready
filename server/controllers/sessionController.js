const Session = require('../models/sessionModel');

const SessionController = {
  startSession: async (req, res, next) => {
    console.log('We entered the Session Controller');
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
