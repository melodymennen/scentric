INSERT INTO products( name, price, description, category, scent_family, image_url, on_sale)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING *;