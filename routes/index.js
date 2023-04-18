import express from "express";
import alunos from "./alunos.js";
import cursos from "./cursos.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Pagina inicial");
});

router.use("/alunos", alunos);
router.use("/cursos", cursos);

export default router;
