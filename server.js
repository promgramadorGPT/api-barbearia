require('dotenv').config(); // Carrega as chaves do .env localmente
const express = require("express");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 CONFIG CLOUDINARY USANDO VARIÁVEIS DE AMBIENTE
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

// 🔥 DELETAR IMAGEM
app.post("/deletar-imagem", async (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) {
      return res.status(400).json({ erro: "public_id obrigatório" });
    }

    const result = await cloudinary.uploader.destroy(public_id);
    res.json({ sucesso: true, resultado: result });

  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao deletar imagem" });
  }
});

app.get("/", (req, res) => {
  res.send("API BARBEARIA ONLINE 🚀");
});

// 🚀 PORTA DINÂMICA PARA O DEPLOY
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando na porta ${PORT}`);
});
