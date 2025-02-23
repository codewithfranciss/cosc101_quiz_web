const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "chidoziem",
  database: "cos",
});

module.exports = db; 
