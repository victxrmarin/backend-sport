const express = require("express");
const bodyParser = require("body-parser");
const loginRoutes = require("./routes/login");

const server = express();

server.use(express.json());
server.use(bodyParser.json());

server.listen(3000, () => {
  console.log("Server is running.");
});

server.use("/login", loginRoutes); 
