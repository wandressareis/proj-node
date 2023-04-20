import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Lista de alunos GET!");
});

router.post("/create", (req, res) => {
  console.log(req.body);
  res.send("Lista de alunos POST!");
});

export default router;
