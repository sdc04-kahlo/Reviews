const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const isoDate = require('../convert_date/isoDate.js')
const conInfo = require('../config.js');
const { Pool, Client } = require('pg');


dotenv.config();
const app = express();
app.use(morgan('dev'));


const client = new Client(conInfo);
client.connect()
  .then(() => console.log('Connected!'))
  .catch(err => console.log(err));


app.get('/', (req, res) => {
  res.send('︻╦╤─ ҉ - - BANG BANG WE RUNNIN!');
});


app.get('/reviews', async (req, res) => {
  const limit = 10;
  console.log(req);
  const query = {
    name: 'get-reviews-all',
    text: `SELECT id, rating, summary, recommend, response, body, reviewer_name, helpfulness  FROM reviews LIMIT $1`,
    values: [limit],
  };

  try {
    const results = await client.query(query);
    res.json(results.rows);
  } catch (err) {
    res.json(err);
  }
});

app.get('/reviews/meta?product_id=:product_id', async (req, res) => {

  const query = {
    name: 'get-reviews-all',
    text: `SELECT id, rating, summary, recommend, response, body, reviewer_name, helpfulness FROM reviews where product_id=$1`,
    values: [req.params.product_id],
  };

  try {
    const results = await client.query(query);
    res.json(results.rows);
  } catch (err) {
    res.json(err);
  }
});

const converter = unix => {
  return new Date(unix).toISOString();
}

app.get('/reviews/:product_id', async (req, res) => {

  const query = {
    name: 'get-one-review',
    text: `SELECT r.id, r.rating, r.date, r.summary, r.body, r.recommend, r.reported, r.reviewer_name, r.response, r.helpfulness,
      (SELECT json_agg(u)
        FROM (
          SELECT url from photos where review_id=r.id
        ) u
      ) as photos FROM reviews r WHERE r.product_id=$1`,
    values: [req.params.product_id],
  };

  try {
    const results = await client.query(query);
    res.json(results.rows);
  } catch (err) {
    res.json(err);
  }
});



app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});