SELECT 
    * 
FROM 
    orders 
INNER JOIN 
    users ON (orders.user_id = users.generated_user_id)
WHERE 
    orders.user_id = $1