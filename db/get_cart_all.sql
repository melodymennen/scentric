SELECT products.name, carts.qty FROM products
INNER JOIN carts ON (carts.product_id = products.id)
ORDER BY carts.qty DESC;