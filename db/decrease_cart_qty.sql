UPDATE carts 
SET qty = qty - 1
WHERE product_id = $1 AND user_id = $2;