const mysql = require('mysql2')

const db_config = {

    host:      'localhost',
    user:      'root',
    port :     3306,
    password : '',
    database:  'codingtech'

}


const connection = mysql.createConnection(db_config);

module.exports = connection.promise()

