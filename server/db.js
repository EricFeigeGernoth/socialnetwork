const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:ericfeigegernoth:bourne3@localhost/social"
);

module.exports.addSignInData = function (first, last, email, password) {
    console.log("in db.js");
    return db.query(
        `INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING id`,
        [first, last, email, password]
    );
};
module.exports.getUser = function (email) {
    console.log("in db.js");
    return db.query(`SELECT * FROM users WHERE email=$1`, [email]);
};

module.exports.resetInsert = function (email, code) {
    console.log("in db.js");
    return db.query(
        `INSERT INTO reset (email, code) VALUES ($1, $2) RETURNING id, email, code`,
        [email, code]
    );
};

module.exports.getResetCode = function (email) {
    console.log("in db.js");
    return db.query(
        `  SELECT * FROM reset
    WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes' AND email = $1
    ORDER BY created_at DESC
    LIMIT 1;
    `,
        [email]
    );
};

module.exports.updatePassword = function (password, email) {
    console.log("in db.js");
    return db.query(
        `
    UPDATE users
    SET password = $1
    WHERE email = $2;`,
        [password, email]
    );
};