SELECT 
    * 
FROM 
    users 
INNER JOIN 
    orders ON (users.generated_user_id = orders.user_id)
WHERE 
    users.generated_user_id = $1