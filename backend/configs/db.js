const mysql = require('mysql2');

const db = mysql.createConnection({
   host: 'database-1.cut08yew2ce1.us-east-1.rds.amazonaws.com',
   port: '3306',
   user: 'admin',
   password: 'rajulvish464',
   database: 'react_node_app'
});

module.exports = db;
