const express = require("express");
const { getConnected } = require("../dist/connect");
const router = express.Router();

const connection = getConnected();

router.get("/login", (req, res) => {
  connection.query("SELECT * FROM users", (error, results) => {
    if (error) {
      res.status(500).send("Error when select.");
      return;
    }
    res.json(results);
  });
});

module.exports = router;
