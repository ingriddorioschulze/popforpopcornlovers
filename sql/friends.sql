DROP TABLE IF EXISTS friends;

CREATE TABLE  users (
    id SERIAL PRIMARY KEY,
    friends TEXT
);