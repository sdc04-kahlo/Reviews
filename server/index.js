const express = require('express');
const db = require('../db');

const app = express();
const port = 3000;

const axios = require('axios')

app.get('/', (req, res) => {
  res.send('︻╦╤─ ҉ - - BANG BANG WE RUNNIN!');
});

app.get('/reviews', (req, res) => {

  db.test((err, item) => {
    if (err) {
      console.log('Error', err);
      res.sendStatus(404);
    } else {
      res.status(200).send(item);
    }
  });

});

app.post('/reviews', (req, res) => {

  // some fn in db

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});