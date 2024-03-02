const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'your_host',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database'
})

function query(queryString, callback) {
    pool.getConnection((error, connection)=>{
        if (error) {
            console.error('Error establishing database connection:', error);
            callback(error, null);
            return;
        }
        connection.query(queryString, (err, results)=>{
            connection.release();

            if (err) {
                console.error('Error executing database query:', err);
                callback(err, null);
                return;
            }

            callback(null, results)
        });
    });
}

module.exports = {
    query
}