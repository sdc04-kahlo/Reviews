// const newrelic = require('newrelic')
const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
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

app.get('/reviews/meta/:product_id', async (req, res) => {

  const metaObj = {
    name: 'get-product-ratings',
    text: `
    SELECT
    product_id,

    json_build_object(
      '1', (SELECT COUNT (rating) FROM reviews WHERE product_id=$1 AND rating=1),
      '2', (SELECT COUNT (rating) FROM reviews WHERE product_id=$1 AND rating=2),
      '3', (SELECT COUNT (rating) FROM reviews WHERE product_id=$1 AND rating=3),
      '4', (SELECT COUNT (rating) FROM reviews WHERE product_id=$1 AND rating=4),
      '5', (SELECT COUNT (rating) FROM reviews WHERE product_id=$1 AND rating=5)
    ) as ratings,

    json_build_object(
      'false', (SELECT COUNT (recommend) FROM reviews WHERE product_id=$1 AND recommend=false),
      'true', (SELECT COUNT (recommend) FROM reviews WHERE product_id=$1 AND recommend=true)
    ) as recommended,

    (SELECT json_object_agg(
      name, json_build_object(
        'id', id,
        'value', 'test'
      )
    ) as characteristics
    FROM characteristics where product_id=$1)

    from characteristics where product_id=$1 LIMIT 1`,
    values: [req.params.product_id],
  };


  try {
    const results = await client.query(metaObj);
    res.json(results.rows[0]);
  } catch (err) {
    res.json(err);
  }
});


app.get('/reviews/:product_id', async (req, res) => {

  const query = {
    name: 'get-product-reviews',
    text: `
    SELECT
    r.id,
    r.rating,
    to_timestamp(r.date::DECIMAL/1000) as date, 
    r.summary,
    r.body,
    r.recommend,
    r.reviewer_name,
    r.response,
    r.helpfulness,
        (SELECT json_agg(u)
          FROM (
            SELECT id, url from photos where review_id=r.id
          ) u
        ) as photos FROM reviews r WHERE r.product_id=$1 AND r.reported=false`,
    values: [req.params.product_id],
  };

  try {
    const results = await client.query(query);
    res.json(results.rows);
  } catch (err) {
    res.json(err);
  }
});

// test

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});