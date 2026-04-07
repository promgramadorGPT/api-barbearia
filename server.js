const express = require("express");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 CONFIG CLOUDINARY
cloudinary.config({
  cloud_name: "dkbhdasfh",
  api_key: "753871694213243",
  api_secret: "tQcdZJjnj14P-Z8fQ1YbP1LW7OU"
});

// 🔥 DELETAR IMAGEM
app.post("/deletar-imagem", async (req, res) => {
  try {
    const { public_id } = req.body;

    if (!public_id) {
      return res.status(400).json({ erro: "public_id obrigatório" });

    }

    const result = await cloudinary.uploader.destroy(public_id);

    res.json({
      sucesso: true,
      resultado: result
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao deletar imagem" });
  }
});

// 🔥 TESTE
app.get("/", (req, res) => {
  res.send("API BARBEARIA ONLINE 🚀");
});

// 🚀 START
app.listen(3000, () => {
  console.log("🔥 Servidor rodando na porta 3000");
});

