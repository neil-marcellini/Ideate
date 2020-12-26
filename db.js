var mysql = require('mysql');
var db;

function connectDatabase() {
    if (!db) {
        db = mysql.createPool(process.env.CLEARDB_DATABASE_URL)
    }
    return db;
}

module.exports = connectDatabase();
