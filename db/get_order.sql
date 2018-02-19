SELECT * 
FROM order_items oi
JOIN orders  o on o.id = oi.order_id
JOIN products p on p.id = oi.product_id
WHERE o.id = $1;