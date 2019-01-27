const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'guide-database',
    user: 'homestead',
    database: 'homestead',
    password: 'secret',
    port: 3306
});

module.exports = pool.promise();