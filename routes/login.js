const express = require("express");
const { getConnected } = require("../dist/connect");
const getHash = require('../scripts/getHash')
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const connection = await getConnected();
    
    const {email, password} = req.body;
    connection.query("SELECT * FROM usuarios WHERE email = ? AND password = ?", [email, getHash(password)], (error, results) => {
      if (error) {
        console.error("Error executing query: ", error);
        return res.status(500).send("Error when selecting data.");
      }
      return res.json(results);
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
    res.status(500).send("Error connecting to the database.");
  }
});

router.post("/", async (req, res) => {
  try {
    const connection = await getConnected();
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).send('Missing required fields: nome, email, and senha.');
    }

    connection.query(
      "INSERT INTO usuarios(nome, email, senha) VALUES (?, ?, ?)",
      [nome, email, senha],
      (error, results) => {
        if (error) {
          console.error("Error executing insert query: ", error);
          return res.status(500).send('Erro ao adicionar usuário.');
        }
        res.status(201).send('Usuário adicionado com sucesso.');
      }
    );
  } catch (error) {
    console.error("Error connecting to the database: ", error);
    res.status(500).send("Error connecting to the database.");
  }
});

module.exports = router;
