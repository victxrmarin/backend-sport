const mysql = require("mysql2");

function getConnected() {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "meu_banco",
    });

    connection.connect((error) => {
      if (error) {
        console.error("Error to connect into database: " + error.stack);
        return reject(error);
      }
      console.log("Connect into database with ID " + connection.threadId);
      resolve(connection);
    });
  });
}

module.exports = { getConnected };
