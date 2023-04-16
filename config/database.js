// importation des modules 
const mysql = require('mysql2')

// fichier de configuration de la base de donnée
const config = {

    host:      'localhost',
    user:      'root',
    port :     3306,
    password : '',
    database:  'codingtech'
};

// instancier un objet depuis les modules importées 
const connection = mysql.createConnection(config)


// exporter l'objet 
module.exports = connection.promise()