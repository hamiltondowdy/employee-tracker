const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Davycrockett1',
    database: 'tracker'
});

module.exports = db;