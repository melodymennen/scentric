INSERT INTO orders
(user_id, order_subtotal)
VALUES 
($1, $2)
RETURNING id;
