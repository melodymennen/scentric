INSERT INTO users (auth0_id, email, pictureUrl, name) VALUES ($4,$2,$3,$1)
RETURNING *;