// require in all necessary packages
const express = require('express');
const path = require('path');
const app = express();
// require in routes
const routes = require('./routes/routes.js');
// assign the PORT
const PORT = 3000;

// handle environment specific serving
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
app.use(express.static(path.resolve(__dirname, '../client/assets')));

// Route for serving index.html
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

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
