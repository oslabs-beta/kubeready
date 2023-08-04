const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const UserController = {
  // middleware to CREATE A USER
  createUser: async (req, res, next) => {
    try {
      // Destructure name, password, and username from the request body
      const { name, password, username, email } = req.body;
      //console.log('here is name from createUser middleware: ', name);

      // Check if the username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        // res.json("this username exists");
        res.send('This username already exists.');
        return next();
        // return next({ error: 'Username already exists' });
      }

      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);

      console.log('attempting to create new user');
      const newUser = new User({
        name,
        password: hashedPassword, // Set the hashed password
        username,
        email,
      });

      // Save the new user to the database
      const savedUser = await newUser.save();

      //console.log('adding createdUser to res.locals');
      res.locals.createdUser = savedUser;

      return next();
    } catch (error) {
      // Use next to propagate the error to the global error handler
      return next(error);
    }
  },

  verifyUser: (req, res, next) => {
    const { username, password } = req.body;
    // console.log(req.body, 'reqbody');
    // console.log(username, 'username');
    if (!username || !password) {
      return next(
        'Error - both username and password should be provided for login.'
      );
    }
    User.findOne({ username })
      .then((user) => {
        //if username is not found
        if (!user) {
          return next('Username or password is not found.');
          //ow, if the username is found
        } else {
          bcrypt.compare(password, user.password).then((result) => {
            //if the stored passwords do not match, return error
            if (!result) {
              return next('Username or password is not found.');
            } else {
              //declare JWT token
              const token = jwt.sign({ userId: user._id }, '123abc');
              //
              res.cookie('kubereadyToken', token, {
                httpOnly: true,
              });

              //if the stored passwords match, save user in res.locals
              res.locals.user = user;
              // console.log('it worked');
              return next();
            }
          });
        }
      })
      .catch((err) => {
        return next({
          log: `userController.verifyUser ERROR: ${err}`,
          status: 500, // internal server error
          message: {
            error: 'Error in finding the username or password',
          },
        });
      });
  },
};
module.exports = UserController;

//VERIFY USER B4 COOKIE STUFF
// verifyUser: (req, res, next) => {
//   const { username, password } = req.body;
//   // console.log(req.body, 'reqbody');
//   // console.log(username, 'username');
//   if (!username || !password) {
//     return next(
//       'Error - both username and password should be provided for login.'
//     );
//   }
//   User.findOne({ username })
//     .then((user) => {
//       //if username is not found
//       if (!user) {
//         return next('Username or password is not found.');
//         //ow, if the username is found
//       } else {
//         bcrypt.compare(password, user.password).then((result) => {
//           //if the stored passwords do not match, return error
//           if (!result) {
//             return next('Username or password is not found.');
//           } else {
//             //if the stored passwords match, save user in res.locals
//             res.locals.user = user;
//             console.log('it worked');
//             return next();
//           }
//         });
//       }
//     })
//     .catch((err) => {
//       return next({
//         log: `userController.verifyUser ERROR: ${err}`,
//         status: 500, // internal server error
//         message: {
//           error: 'Error in finding the username or password',
//         },
//       });
//     });
// },
