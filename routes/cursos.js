import express from "express";
import { curso } from "../models/index.js";
import { CursoController } from "../controller/curso.controller.js"
const router = express.Router();

const cursoController = new CursoController(curso)


router.get("/", async (req, res) => {
  const cursos = await cursoController.getAll()
  res.json(cursos);
});

router.post("/create", async (req, res) => {
  const { nome, ch } = req.body;
  await cursoController.adicionar({ nome, ch })
  res.status(201).send("Curso criado com sucesso!");
});

export default router;
