const express = require("express");

const login = require("./routes/login");
const server = express();

server.use(express.json());


server.listen(3000, () => {
  console.log("Server is running.");
});

server.use("/login", login);