CREATE TABLE users (
id SERIAL PRIMARY KEY, 
name TEXT, 
email TEXT, 
picture_url TEXT,
auth0_id TEXT
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