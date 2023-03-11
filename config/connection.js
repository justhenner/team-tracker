const mysql = require("mysql2");
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "team_db",
    multipleStatements: true
  },
  console.log(`Success! You're connected to team_db database.`)
);