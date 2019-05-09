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
    const q = `SELECT id, first_name, last_name, users_image
    FROM users
    WHERE lower(first_name || ' ' || last_name) LIKE $1
    LIMIT 6`;
    const params = [`%${text.toLowerCase()}%`];
    return db.query(q, params).then(result => {
        return result.rows;
    });
};

exports.getUsersByIds = function(arrayOfIds) {
    const q = `SELECT id, first_name, last_name, users_image 
    FROM users 
    WHERE id = ANY($1)`;
    return db.query(q, [arrayOfIds]);
};

exports.checkFriendship = function(id_sender, id_recipient) {
    const q = `SELECT id 
    FROM friends 
    WHERE (request_accepted = true)
    AND ((id_sender = $1 AND id_recipient = $2) OR
    (id_sender = $2 AND id_recipient = $1))`;
    const params = [id_sender, id_recipient];
    return db.query(q, params).then(result => result.rows.length > 0);
};

exports.createPost = function(id_sender, id_recipient, post) {
    const q = `INSERT INTO posts (id_sender, id_recipient, post, time)
    VALUES ($1, $2, $3, now()) RETURNING id, time`;
    const params = [id_sender, id_recipient, post];
    return db.query(q, params).then(result => {
        return result.rows[0];
    });
};

exports.getPosts = function(id_recipient) {
    const q = `SELECT posts.id AS id, post, posts.time AS time, users_image, first_name, last_name
    FROM posts
    JOIN users ON users.id = id_sender
    WHERE id_recipient = $1 
    ORDER BY time DESC`;
    const params = [id_recipient];
    return db.query(q, params).then(result => {
        return result.rows;
    });
};
