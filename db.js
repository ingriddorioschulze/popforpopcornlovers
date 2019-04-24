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
