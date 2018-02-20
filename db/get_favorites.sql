SELECT * FROM products p
JOIN favorites f ON p.id = f.product_id 
WHERE f.user_id = $1
ORDER BY p.name;