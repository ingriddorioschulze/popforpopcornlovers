const spicedPg = require("spiced-pg");

const dbUrl =
    process.env.DATABASE_URL ||
    "postgres:postgres:postgres@localhost:5432/socialnetwork";

const db = spicedPg(dbUrl);

exports.registerUser = function registerUser(
    first_name,
    last_name,
    email_address,
    password,
    time
) {
    const q = `INSERT INTO users (first_name, last_name, email_address, password, time) 
    VALUES ($1, $2, $3, $4, $5) RETURNING id`;
    const params = [first_name, last_name, email_address, password, time];
    return db.query(q, params).then(result => {
        return result.rows[0].id;
    });
};

exports.getUser = function(email_address) {
    const q = `SELECT id, first_name, last_name, password
    FROM users 
    WHERE email_address = $1`;
    const params = [email_address];
    return db.query(q, params).then(result => {
        if (result.rows.length === 0) {
            return null;
        } else {
            return result.rows[0];
        }
    });
};

exports.getUserData = function(id) {
    const q = `SELECT id, first_name, last_name, users_image, bio
    FROM users
    WHERE id = $1`;
    const params = [id];
    return db.query(q, params).then(result => {
        return result.rows[0];
    });
};

exports.updateProfilePicture = function(user_image, id) {
    const q = `UPDATE users
    SET users_image = $1
    WHERE id = $2`;
    const params = [user_image, id];
    return db.query(q, params);
};

exports.updateBio = function(bio, id) {
    const q = `UPDATE users
    SET bio = $1
    WHERE id = $2`;
    const params = [bio, id];
    return db.query(q, params);
};

exports.getFriendRequest = function(user1_id, user2_id) {
    const q = `SELECT id_sender, id_recipient, request_accepted, accepted_on
    FROM friends
    WHERE (id_sender = $1 AND id_recipient = $2) 
    OR (id_recipient = $1 AND id_sender = $2)`;
    const params = [user1_id, user2_id];
    return db.query(q, params).then(result => {
        return result.rows[0];
    });
};

exports.createFriendRequest = function(id_sender, id_recipient) {
    const q = `INSERT INTO friends (id_sender, id_recipient, request_accepted)
    VALUES ($1, $2, false)`;
    const params = [id_sender, id_recipient];
    return db.query(q, params);
};

exports.removeFriendRequest = function(id_sender, id_recipient) {
    const q = `DELETE FROM friends 
    WHERE (id_sender = $1 AND id_recipient = $2) 
    OR (id_recipient = $1 AND id_sender = $2)`;
    const params = [id_sender, id_recipient];
    return db.query(q, params);
};
exports.acceptFriendRequest = function(id_sender, id_recipient) {
    const q = `UPDATE friends 
    SET request_accepted = true, accepted_on = now()
    WHERE (id_sender = $1 AND id_recipient = $2) 
    OR (id_recipient = $1 AND id_sender = $2)`;
    const params = [id_sender, id_recipient];
    return db.query(q, params);
};

exports.getFriends = function(user_id) {
    const q = `SELECT
        id_sender, id_recipient, request_accepted, accepted_on,
        users.id as id, first_name, last_name, users_image
    FROM friends
    JOIN users ON users.id = CASE WHEN id_sender = $1 THEN id_recipient ELSE id_sender END
    WHERE (id_sender = $1 AND request_accepted = true)
    OR (id_recipient = $1)`;
    const params = [user_id];
    return db.query(q, params).then(result => {
        return result.rows;
    });
};

exports.search = function(text) {
    console.log(text);
    const tsquery = text.split(" ").reduce((acc, next) => {
        console.log(acc);
        return acc === "" ? `${next}:*` : `${acc} & ${next}:*`;
    }, "");
    console.log(tsquery);
    const q = `SELECT id, first_name, last_name, users_image
    FROM users
    WHERE to_tsvector(first_name || ' ' || last_name) @@ to_tsquery($1)`;
    const params = [tsquery];
    return db.query(q, params).then(result => {
        return result.rows;
    });
};
