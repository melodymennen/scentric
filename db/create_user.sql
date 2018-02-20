INSERT INTO users 
(name, email, picture_Url, auth0_id, generated_user_id, is_admin) 
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;