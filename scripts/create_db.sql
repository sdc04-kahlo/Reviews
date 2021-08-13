DROP DATABASE atelier_reviews;
CREATE DATABASE atelier_reviews;

\c atelier_reviews;


CREATE TABLE products (
  id SERIAL,
  name VARCHAR NOT NULL,
  slogan VARCHAR NOT NULL,
  description VARCHAR NOT NULL,
  category VARCHAR NOT NULL,
  default_price INTEGER NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE reviews (
  id SERIAL,
  product_id INTEGER NULL DEFAULT NULL,
  rating INTEGER NOT NULL,
  date BIGINT NOT NULL,
  summary VARCHAR NOT NULL,
  body VARCHAR NOT NULL,
  recommend BOOLEAN NOT NULL,
  reported BOOLEAN NOT NULL,
  reviewer_name VARCHAR NOT NULL,
  reviewer_email VARCHAR NOT NULL,
  response VARCHAR NULL DEFAULT NULL,
  helpfulness INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
);

CREATE TABLE characteristic_reviews (
  id SERIAL,
  characteristic_id INTEGER NOT NULL,
  review_id INTEGER NOT NULL,
  value INTEGER NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE photos (
  id SERIAL,
  review_id INTEGER NOT NULL,
  url VARCHAR NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE characteristics (
  id SERIAL,
  product_id INTEGER NOT NULL,
  name VARCHAR NOT NULL,
  PRIMARY KEY (id)
);

ALTER TABLE reviews ADD FOREIGN KEY (product_id) REFERENCES products (id);
ALTER TABLE characteristics ADD FOREIGN KEY (product_id) REFERENCES products (id);
ALTER TABLE photos ADD FOREIGN KEY (review_id) REFERENCES reviews (id);
ALTER TABLE characteristic_reviews ADD FOREIGN KEY (characteristic_id) REFERENCES characteristics (id);
ALTER TABLE characteristic_reviews ADD FOREIGN KEY (review_id) REFERENCES reviews (id);

-- Test Data
-- ---

-- select name from products where id=2;

-- select product_id from reviews;

-- select * from reviews where product_id=2;