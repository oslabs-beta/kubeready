//require in express
const path = require('path');
const express = require('express');
const app = express();

const PORT = 3000;
//handle environment specific serving
//if(process.env.NODE_ENV === 'development){
//app.use(express.static())
// } else if (process.env.NODE_ENV === 'production'){
//   //serve these files
//app.use(express.static())
// }
app.use('/', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.use('/styles.css', (req, res) =>
  res
    .set('content-type', 'text/css')
    .sendFile(path.resolve(__dirname, '../client/styles.css'))
);

app.listen(PORT, () => console.log(`listening on ${PORT}`));

module.exports = app;
