SELECT products.name, order_items.qty FROM products
INNER JOIN order_items ON (order_items.product_id = products.id);