import { Router} from "express";

const postRoutes = Router();
postRoutes.post("/login", (req, res) => {
    res.send("Realiza Login.");
  });

postRoutes.post("/users", (req, res) => {
  res.send("Cadastra um usuário.");
});
postRoutes.get("/users", (req, res) => {
  res.send("Lista todos os usuários.");
});

postRoutes.get("/users/:id", (req, res) => {
  res.send("Lista usuário por id.");
});

postRoutes.get("/posts", (req, res) => {
  res.send("Lista posts.");
});
postRoutes.get("/posts/:id", (req, res) => {
  res.send("Lista post por id.");
});
postRoutes.post("/posts", (req,res) => {
  res.send("Cadastra post.");
});
postRoutes.put("/posts/:id", (req, res) => {
  res.send("Atualiza post por id.");
});
postRoutes.delete("/posts/:id", (req, res) => {
  res.send("Apaga post por id.");
});

export {postRoutes};