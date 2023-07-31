const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const UserController = {
  // middleware to CREATE A USER
  createUser: async (req, res, next) => {
    try {
      // Destructure name, password, and username from the request body
      const { name, password, username } = req.body;
      console.log('here is name from createUser middleware: ', name);

      // Check if the username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        // res.json("this username exists");
        res.send('This username already exists.')
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
      });

      // Save the new user to the database
      const savedUser = await newUser.save();

      console.log('adding createdUser to res.locals');
      res.locals.createdUser = savedUser;

      return next();
    } catch (error) {
      // Use next to propagate the error to the global error handler
      return next(error);
    }
  },
};
// const UserController = {
//   //middleware to CREATE A USER
//   createUser: (req, res, next) => {
//     //destructure off name, pw, and username
//     const { name, password, username } = req.body;
//     console.log('here is name from createUser middleware: ', name);

//     //check if the username already exists
//     User.findOne({ username })
//       .then((existingUser) => {
//         if (existingUser) {
//            return next({ error: 'Username already exists' });
//         }
//         // Hash the password before saving it to the database
//         return bcrypt.hash(password, 10);
//       })
//       //creates new user instance and save it to database
//       .then((hashedPassword) => {
//         console.log('attempting to create new user');
//         // hash password here
//         const newUser = new User({
//           name,
//           password: hashedPassword,
//           username,
//         });
//         //save to db
//        return newUser.save();
//       })
//       //add the key of newUser to the res locals obj
//       // return confirmation and status
//       .then((newUser) => {
//         console.log('adding createdUser to res.locals')
//         res.locals.createdUser = newUser;
//         // res.status(201).json({ message: 'User registered successfully' });
//         // res.send('User registered successfully')
//         return next();
//       })
//       // error catcher
//       .catch((error) => {
//         // res.status(500).json({
//         //   message: 'User was not registered',
//         //   err: error,
//         // });
//         return next(error);
//       });
//   },
// };

//export
module.exports = UserController;

//SIMPLE VERSION
// const UserController = {
//   createUser(req,res,next){
//     console.log('entered UserController.createUser');
//     console.log('reqbody', req.body);
//     const { name, password, username } = req.body;
    

//     const userObj = {
//       name,
//       username,
//       password
//     };
//     User.create(userObj)
//       .then((data) => {
//         res.locals.createdUser = data;
//         return next();
//       })
//       .catch((err) => {
//         next({
//           log:'createUser: error',
//           status: 401,
//           message: {err: 'user was not created'}
//         })
//       })
//   }
// }