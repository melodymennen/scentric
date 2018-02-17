UPDATE users 
SET stripe_user_id = $1 
WHERE id = $2;
