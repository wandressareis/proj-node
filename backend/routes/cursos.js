import express from "express";
import { curso } from "../models/index.js";
import { CursoController } from "../controller/curso.controller.js";
import { body, validationResult } from "express-validator";
const router = express.Router();

const cursoController = new CursoController(curso);

// coletar todos os cursos
router.get("/", async (req, res) => {
  const cursos = await cursoController.getAll();
  res.json(cursos);
});

// cria um novo curso
router.post(
  "/create",
  [
    //validação dos dados
    body("nome").notEmpty().trim().withMessage("O campo nome é obrigatório"),
    body("ch")
      .isNumeric()
      .isLength({ min: 2 })
      .withMessage("O campo ch deve ser numérico apenas"),
  ],
  async (req, res) => {
    // caso encontre erros, ficará nessa variável errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //se os dados forem válidos, o sistema executará aqui
    const { nome, ch } = req.body;
    await cursoController.adicionar({ nome, ch });
    res.status(201).send("Curso criado com sucesso!");
  }
);

// deleta um curso específico
router.delete(
  "/delete/:id", //:id é um parâmetro
  async (req, res) => {
    await cursoController.excluir(req.params.id);
    res.send("Curso excluído com sucesso!");
  }
);
// atualizar um curso
router.put(
  "/update/:id",
  [
    //validação dos dados
    body("nome").notEmpty().trim().withMessage("O campo nome é obrigatório"),
    body("ch")
      .isNumeric()
      .isLength({ min: 2 })
      .withMessage("O campo ch deve ser numérico apenas"),
  ],
  async (req, res) => {
    // caso encontre erros, ficará nessa variável errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } //se os dados forem válidos, o sistema executará aqui
    const { nome, ch } = req.body;

    await cursoController.atualizar(req.params.id, { nome, ch });
    res.send("Curso atualizado com sucesso!");
  }
);

export default router;