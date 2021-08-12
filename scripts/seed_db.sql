copy products
from '/home/tyler_petersen/hackreactor/Reviews/Reviews_data/product.csv'
delimiter ','
csv header;

copy reviews
from '/home/tyler_petersen/hackreactor/Reviews/Reviews_data/reviews.csv'
delimiter ','
csv header;

copy characteristic_reviews
from '/home/tyler_petersen/hackreactor/Reviews/Reviews_data/characteristic_reviews.csv'
delimiter ','
csv header;

copy photos
from '/home/tyler_petersen/hackreactor/Reviews/Reviews_data/reviews_photos.csv'
delimiter ','
csv header;

copy characteristics
from '/home/tyler_petersen/hackreactor/Reviews/Reviews_data/characteristics.csv'
delimiter ','
csv header;

