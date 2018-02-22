UPDATE products
SET name = $2, price = $3, description = $4, category = $5, scent_family = $6, image_url = $7
WHERE id = $1;