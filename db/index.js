const { Client } = require('pg')
const client = new Client()

const conInfo = require('');

client.connect(conInfo)


module.exports = {

  test: function (cb) {
    console.log('hello there')
    client.query('SELECT * FROM reviews WHERE product_id=2;', (err, item) => {
      if (err) {
        cb(err);
      } else {
        cb(err, item);
      }
      client.end()
    });
  },




}