// require in all necessary packages
const express = require('express');
const app = express();
const path = require('path');
// require in routes
const router = require('./routes/routes.js');
const SessionController = require('./controllers/sessionController.js');
// assign the PORT (3001)
const PORT = 3001;
//const authController = require('./controllers/authController.js');
//used to parse all incoming requests from JSON to JS from the client
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://serenahromano2000:E17s30FqKCRZoW5t@cluster0.krvanjb.mongodb.net/',
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

// handle environment-specific serving
//if (process.env.NODE_ENV === 'production') {
// // serve these files
// app.use(express.static('./build/bundle)'));

// statically serve everything in the build folder on the route '/'
//CHANGED ROUTE FROM /BUILD TO '/' - WAS RENDERING REACT APP IF U DID LOCALHOST:3000/BUILD
// app.use('/', express.static(path.join(__dirname, '../build/')));
//app.use(express.static(path.join(__dirname, '../build/')));

// serve index.html on the route '/'
//TRYING THIS OUT - COMMENTING OUT THIS ROUTE
// app.get('/', (req, res) => {
//   return res
//     .status(200)
//     .sendFile(path.join(__dirname, '../client/index.html'));
// });
//}

// Serve static files from the assets folder.
//FOR FUTURE
//was client
app.use(express.static(path.resolve(__dirname, '../build/')));
// client / login.html;
// Route for serving index.html
app.get('/', (req, res) => {
  // if user is recognized with token
  // if (res.locals.hasToken) {
  //   //send them to /homepage for dashboards
  //   res.
  // }
  // // otherwise send them to login page at index
  // else {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
  // }
});

app.get('/homepage', SessionController.checkCookie, (req, res) => {
  if (res.locals.hasCookie) {
    res.status(200).redirect('/homepage');
  } else {
    res.status(401).send('NO COOKIE FOUND');
  }
});

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../build', '../client/index.html'));
// });

// app.get('/signup', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../client/index.html'));
// });

// app.get('/homepage', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../client/index.html'));
// });

//invoking routes middleware for any incoming HTTP requests
// /api is path - telling it to look at router
app.use('/api', router);

// set content-type header based on file extension
app.use((req, res, next) => {
  // extract file extension from request URL using "path.extname()" method
  const ext = path.extname(req.url);
  // initialize variable content type to store content type
  let contentType = '';

  // determine content type based on file extension
  switch (ext) {
    case '.css':
      contentType = 'text/css';
      break;
    case '.js':
      contentType = 'application/javascript';
      break;
    case '.yaml':
      contentType = 'text/yaml';
      break;
  }

  // set content-type header in response
  res.setHeader('Content-Type', contentType);
  // move on to next middleware in chain
  next();
});

//FOR LOGOUT - probably move to routes.js later
router.post('/api/logout', (req, res) => {
  return res.status(201);
});

// catch-all error handler
app.use('*', (req, res) => {
  // Send a 404 status code and display a message.
  res.status(404).send('Page not found.');
});

// global error handler
app.use((err, req, res, next) => {
  // define default error object
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error has occurred' },
  };
  // merge default error object with error received
  const errorObj = Object.assign({}, defaultErr, err);
  // log error message to console
  console.log(errorObj.log);
  // send the error response with status code and message
  return res.status(errorObj.status).json(errorObj.message);
});

// listening on port
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
