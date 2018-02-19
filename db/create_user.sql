INSERT INTO users 
(name, email, picture_Url, auth0_id, generated_user_id) 
VALUES ($1, $2, $3, $4, $5)
RETURNING *;