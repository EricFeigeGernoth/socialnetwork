DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS reset;
DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS chatcomments;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first VARCHAR(255) NOT NULL,
    last VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    profile_pic VARCHAR(255),
    bio VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE reset(
    id SERIAL PRIMARY KEY,
    email VARCHAR REFERENCES users(email),
    code VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE friendships( 
  id SERIAL PRIMARY KEY, 
  sender_id INT REFERENCES users(id) NOT NULL, 
  recipient_id INT REFERENCES users(id) NOT NULL, 
  accepted BOOLEAN DEFAULT false);

CREATE TABLE chatcomments(
    id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users(id) NOT NULL,
    message VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)