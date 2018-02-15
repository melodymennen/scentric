SELECT * 
FROM carts
JOIN products on products.id = carts.product_id
WHERE user_id = $1
ORDER BY name;