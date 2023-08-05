// require in all necessary packages
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const router = require('./routes/routes.js');

const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(
  'mongodb+srv://serenahromano2000:E17s30FqKCRZoW5t@cluster0.krvanjb.mongodb.net/',
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

// handle environment-specific serving
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build/')));
}

app.use(express.static(path.resolve(__dirname, '../build/')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.use('/login', loginRouter);
app.use('/signup', signupRouter);

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../build', '../client/index.html'));
// });

// app.get('/signup', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../client/index.html'));
// });

// app.get('/homepage', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../client/index.html'));
// });

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
