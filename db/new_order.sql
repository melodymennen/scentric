INSERT INTO orders
(user_id, order_subtotal, order_date)
VALUES 
($1, $2, $3)
RETURNING id;
