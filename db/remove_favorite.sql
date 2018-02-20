DELETE FROM favorites
WHERE user_id = $1 AND product_id = $2;