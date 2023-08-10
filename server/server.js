const express = require('express');
const app = express();
const path = require('path');

const router = require('./routes/routes.js');
const SessionController = require('./controllers/sessionController.js');

const PORT = 3001;

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

app.use(express.static(path.resolve(__dirname, '../build/')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.get('/homepage', SessionController.checkCookie, (req, res) => {
  if (res.locals.hasCookie) {
    res.status(200).redirect('/homepage');
  } else {
    console.log('No cookie found - you should not be accessing /homepage');
    res.status(401).send('No cookie found');
  }
});

// Sending /api paths to router
app.use('/api', router);

// Setting content-type header based on file extension
app.use((req, res, next) => {
  // Extracting file extension from request URL using "path.extname()" method
  const ext = path.extname(req.url);
  // Initializing variable content type to store content type
  let contentType = '';

  // Determining content type based on file extension
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

  // Setting content-type header in response
  res.setHeader('Content-Type', contentType);
  // Move to next middleware in chain
  next();
});

// In future updates, logout can be moved to routes.js
router.post('/api/logout', (req, res) => {
  return res.status(201);
});

// Catch-all error handler
app.use('*', (req, res) => {
  // Sends 404 status and display a message
  res.status(404).send('Page not found.');
});

// Global error handler
app.use((err, req, res, next) => {
  // Defines default error object
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error has occurred' },
  };
  // Merges default error object with error received
  const errorObj = Object.assign({}, defaultErr, err);
  // Logs error message to console
  console.log(errorObj.log);
  // Sends the error response with status code and message
  return res.status(errorObj.status).json(errorObj.message);
});

// Listening on port
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
