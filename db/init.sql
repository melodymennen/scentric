CREATE TABLE users (
id SERIAL PRIMARY KEY, 
name TEXT, 
email TEXT, 
picture_url TEXT,
auth0_id TEXT,
address TEXT, 
stripe_user_id TEXT, 
generated_user_id INTEGER
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

CREATE TABLE orders (
id SERIAL PRIMARY KEY,
user_id INTEGER, --refer to users(generated_user_id)
order_subtotal DECIMAL(10,2),
order_date TIMESTAMP DEFAULT now()
);

CREATE TABLE order_items (
id SERIAL PRIMARY KEY,
order_id INTEGER references orders(id),
product_id INTEGER references products(id),
price DECIMAL(10,2),
qty INTEGER
);

-- PRODUCTS
INSERT INTO products
(name, price, description, category, scent_family, image_url)
VALUES 
('buttery popcorn', '89.98', 'Don''t wait to be at the movies to enjoy this aroma, butter yourself up with this scent and you will be the feature presentation.', 'perfume','fresh', 'https://s3-us-west-1.amazonaws.com/scentric/perfumes/butterypopcorn.png'),
('bigg dogg danny luv', '299.98', 'Fans everywhere will mistake you for the real thing. Be careful of swooning, knee-buckling, and infatuating glances.', 'cologne','warm and spicy', 'https://s3-us-west-1.amazonaws.com/scentric/colognes/biggdogg.png'),
('pickle rick', '54.98', 'The reason anyone would buy this is, if they could, which they can''t, would be because they could, which they can''t.', 'perfume','green', 'https://s3-us-west-1.amazonaws.com/scentric/perfumes/picklerick.png'),
('jake''s tears', '4.98', 'Bitter and sweet.', 'perfume','green', 'https://s3-us-west-1.amazonaws.com/scentric/perfumes/jaketears.png'),
('mo money mo problems', '84.99', 'You can never have too much money.', 'perfume','green', 'https://s3-us-west-1.amazonaws.com/scentric/perfumes/momoneymoproblems.png');
