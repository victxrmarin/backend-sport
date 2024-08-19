const express = require("express");
const pool = require("../dist/connect"); 
const getHash = require('../scripts/getHash')
const router = express.Router();

router.get("/", async (req, res) => {
    const {email, password} = req.body;
    
    pool.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, await getHash(password)], (error, results) => {
      if (error) {
        console.error("Error executing query: ", error);
        return res.status(500).json({message: "usuário não encontrado", success: false});
      }
      return res.status(201).json({message: "Login realizado com sucesso", success: true});

    });
});

router.post("/", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({message: 'Missing required fields: username, email, and senha.'});
    }

    pool.query(
      "INSERT INTO usuarios(nome, email, senha) VALUES (?, ?, ?)",
      [username, email, password],
      (error, res) => {
        if (error) {
          console.error("Error executing insert query: ", error);
          return res.status(500).json({message: 'Erro ao adicionar usuário.'});
        }
        res.status(201).json({message: 'Usuário adicionado com sucesso.'});
      }
    );
});

module.exports = router;
