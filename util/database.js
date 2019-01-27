const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'homestead',
    database: 'homestead',
    password: 'secret'
});

module.exports = pool.promise();