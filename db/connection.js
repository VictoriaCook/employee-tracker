const mysql = require('mysql2');

// Connect to MySQL database

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '88888888',
      database: 'team_db'
    },
    console.log(`You are now connected to the team_db database.`)
  );

module.exports = {db};
