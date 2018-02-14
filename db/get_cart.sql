SELECT * 
FROM carts
JOIN products on products.id = carts.product_id
ORDER BY name;