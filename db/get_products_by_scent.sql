SELECT * FROM products 
WHERE scent_family = $1
ORDER BY name;