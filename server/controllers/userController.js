const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const UserController = {
  //middleware to CREATE A USER
  createUser: (req, res, next) => {
    //destructure off name, pw, and username
    const { name, password, username } = req.body;

    //check if the username already exists
    User.findOne({ username })
      .then((existingUser) => {
        if (existingUser) {
          return res.status(409).json({ error: 'Username already exists' });
        }
        // Hash the password before saving it to the database
        return bcrypt.hash(password, 10);
      })
      //creates new user and saves it to database
      .then((hashedPassword) => {
        const newUser = new User({
          name,
          password: hashedPassword,
          username,
        });
        return newUser.save();
      })
      .then(() => {
        res.status(201).json({ message: 'User registered successfully' });
      })
      .catch((error) => {
        res.status(500).json({
          message: 'User was not registered',
          err: error,
        });
      });
  },
};
