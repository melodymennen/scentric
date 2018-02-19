SELECT * FROM products p
JOIN favorites f ON p.id = f.recipe_id 
WHERE f.user_id = $1
ORDER BY p.name;