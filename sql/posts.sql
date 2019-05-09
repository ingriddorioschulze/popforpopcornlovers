DROP TABLE IF EXISTS posts;

CREATE TABLE  posts (
    
    id SERIAL PRIMARY KEY,
    id_sender INT NOT NULL REFERENCES users(id),
    id_recipient INT NOT NULL REFERENCES users(id),
    post TEXT NOT NULL,
    time TIMESTAMPTZ
);