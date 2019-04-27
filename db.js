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
    const q = `SELECT id, first_name, last_name, users_image
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
