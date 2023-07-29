// require in all necessary packages
const express = require('express');
const app = express();
const path = require('path');
// require in routes
const routes = require('./routes/routes.js');
// assign the PORT (3001)
const PORT = 3001;

const mongoose = require('mongoose');
// ** testing to see if connections work first, then will need to refactor mongoDB connections into .env **
const myURI =
  'mongodb+srv://serenahromano2000:<E17s30FqKCRZoW5t>@cluster0.krvanjb.mongodb.net/';
const URI = process.env.MONGO_URI || myURI;

mongoose.connect(
  'mongodb+srv://serenahromano2000:passwordforURI@cluster0.x9zlw6i.mongodb.net/',
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

// handle environment-specific serving
if (process.env.NODE_ENV === 'production') {
  // // serve these files
  // app.use(express.static('./build/bundle)'));

  // statically serve everything in the build folder on the route '/build'
  //CHANGED ROUTE FROM /BUILD TO '/' - WAS RENDERING REACT APP IF U DID LOCALHOST:3000/BUILD
  app.use('/', express.static(path.join(__dirname, '../build/')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    return res
      .status(200)
      .sendFile(path.join(__dirname, '../client/index.html'));
  });
}

// Serve static files from the assets folder.
//FOR FUTURE
app.use(express.static(path.resolve(__dirname, '../client')));
// client / login.html;
// Route for serving index.html
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

//SERENA MAKING CHANGES BC MAKING A LOGIN PAGE
//login route
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/login.html'));
});

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
