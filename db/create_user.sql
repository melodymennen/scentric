INSERT INTO users (auth0_id, email, picture_Url, name) VALUES ($1,$2,$3,$4)
RETURNING *;