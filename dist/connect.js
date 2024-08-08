const mysql = require("mysql2");

function getConnected() {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "meubanco",
    });

    connection.connect((error) => {
      if (error) {
        console.error("Error connecting to database: " + error.stack);
        return reject(error);
      }
      console.log("Connected to database with ID " + connection.threadId);
      resolve(connection);
    });
  });
}

module.exports = { getConnected };
