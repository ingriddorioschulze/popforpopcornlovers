DROP TABLE IF EXISTS friends;

CREATE TABLE  friends (
    id SERIAL PRIMARY KEY,
    id_sender INT NOT NULL REFERENCES users(id),
    id_recipient INT NOT NULL REFERENCES users(id),
    request_accepted BOOLEAN NOT NULL,
    accepted_on TIMESTAMP
);