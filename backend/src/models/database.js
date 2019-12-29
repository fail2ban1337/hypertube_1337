const { DB_HOST, DB_DATABASE, DB_USER, DB_PASSWORD } = process.env;

const mysql = require("mysql2");

const { user, password, host, database } = config.get("database");

const connection = mysql.createPool({
  host,
  user,
  password,
  database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const pool = connection.promise();

module.exports = {
  pool
};
