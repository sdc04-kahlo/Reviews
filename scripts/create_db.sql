DROP DATABASE atelier_reviews;
CREATE DATABASE atelier_reviews;

\c atelier_reviews;

REVOKE ALL ON products FROM api;
REVOKE ALL ON reviews FROM api;
REVOKE ALL ON photos FROM api;
REVOKE ALL ON characteristics FROM api;
REVOKE ALL ON characteristic_reviews FROM api;

DROP ROLE api;
CREATE ROLE api LOGIN PASSWORD 'review123';


DROP TABLE IF EXISTS characteristic_reviews;
DROP TABLE IF EXISTS characteristics;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS products;

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  slogan VARCHAR NOT NULL,
  description VARCHAR NOT NULL,
  category VARCHAR NOT NULL,
  default_price INTEGER NOT NULL
);

COPY products
FROM '/home/tyler_petersen/hackreactor/Reviews/Reviews_data/product.csv'
DELIMITER ','
CSV HEADER;

CREATE INDEX ON products (id);
GRANT ALL ON products TO api;


CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  product_id INT REFERENCES products (id),
  rating INTEGER NOT NULL,
  date BIGINT NOT NULL,
  summary VARCHAR NOT NULL,
  body VARCHAR NOT NULL,
  recommend BOOLEAN NOT NULL,
  reported BOOLEAN NOT NULL,
  reviewer_name VARCHAR NOT NULL,
  reviewer_email VARCHAR NOT NULL,
  response VARCHAR NULL DEFAULT NULL,
  helpfulness INTEGER NOT NULL DEFAULT 0
);

COPY reviews
FROM '/home/tyler_petersen/hackreactor/Reviews/Reviews_data/reviews.csv'
DELIMITER ','
CSV HEADER;

CREATE INDEX ON reviews (id);
GRANT ALL ON reviews TO api;


CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  review_id INT NOT NULL,
  url VARCHAR NOT NULL
);

COPY photos
FROM '/home/tyler_petersen/hackreactor/Reviews/Reviews_data/reviews_photos.csv'
DELIMITER ','
CSV HEADER;

CREATE INDEX ON photos (review_id);
GRANT ALL ON photos TO api;


CREATE TABLE characteristics (
  id SERIAL PRIMARY KEY,
  product_id INT REFERENCES products (id),
  name VARCHAR NOT NULL
);

COPY characteristics
FROM '/home/tyler_petersen/hackreactor/Reviews/Reviews_data/characteristics.csv'
DELIMITER ','
CSV HEADER;

CREATE INDEX ON characteristics (product_id);
GRANT ALL ON characteristics TO api;


CREATE TABLE characteristic_reviews (
  id SERIAL PRIMARY KEY,
  characteristic_id INT REFERENCES characteristics (id),
  review_id INT REFERENCES reviews (id),
  value INTEGER NOT NULL
);

COPY characteristic_reviews
FROM '/home/tyler_petersen/hackreactor/Reviews/Reviews_data/characteristic_reviews.csv'
DELIMITER ','
CSV HEADER;

CREATE INDEX ON characteristic_reviews (characteristic_id);
GRANT ALL ON characteristic_reviews TO api;
