SELECT orders.user_id, orders.order_subtotal, orders.order_date, users.name, users.email, users.address
FROM users
Left JOIN orders ON orders.user_id=users.generated_user_id;