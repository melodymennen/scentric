CREATE TABLE users (
id SERIAL PRIMARY KEY, 
name TEXT, 
email TEXT, 
picture_url TEXT,
auth0_id TEXT,
Address TEXT
);

CREATE TABLE products (
id SERIAL PRIMARY KEY,
name VARCHAR(100),
price DECIMAL, 
description TEXT,
category TEXT,
scent_family TEXT,
image_url TEXT
);

CREATE TABLE carts (
id SERIAL PRIMARY KEY,
user_id INTEGER,
product_id INTEGER references products(id) ON DELETE CASCADE,
qty INTEGER
);

CREATE TABLE favorites (
id SERIAL PRIMARY KEY, 
user_id INTEGER references users(id) ON DELETE CASCADE,
product_id INTEGER references products(id) ON DELETE CASCADE
);

-- PRODUCTS
INSERT INTO products( name, price, description, category, scent_family, image_url)
VALUES ('buttery popcorn', '89.98', 'Don''t wait to be at the movies to enjoy this aroma, butter yourself up with this scent and you will be the feature presentation', 'perfume','fresh', 'https://s3-us-west-1.amazonaws.com/scentric/perfumes/butterypopcorn.png');


INSERT INTO products( name, price, description, category, scent_family, image_url)
VALUES ('bigg dogg danny luv', '299.98', 'Fans everywhere will mistake you for the real thing. Be careful of swooning, knee-buckling, and infatuating glances', 'cologne','warm and spicy', 'https://s3-us-west-1.amazonaws.com/scentric/colognes/biggdogg.png');
