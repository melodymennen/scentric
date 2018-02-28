SELECT products.name, products.image_url, order_items.qty FROM products
INNER JOIN order_items ON (order_items.product_id = products.id)
order by order_items.qty DESC;