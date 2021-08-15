const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const conInfo = require('../config.js');
const { Pool, Client } = require('pg');

dotenv.config();
const app = express();
app.use(morgan('dev'));

// const pool = new Pool(conInfo);

// pool.query(`select * from reviews where id=2`, (err, res) => {
//   console.log(err, res)
//   pool.end()
// })


const client = new Client(conInfo);
client.connect()
  .then(() => console.log('Connected!'))
  .catch(err => console.error(err.stack));


// client.query(`select * from reviews where id=2`, (err, res) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(res.rows);
//   }
// })


app.get('/', (req, res) => {
  res.send('︻╦╤─ ҉ - - BANG BANG WE RUNNIN!');
});


app.listen(conInfo.port, () => {
  console.log(`Example app listening at http://localhost:${conInfo.port}`);
});