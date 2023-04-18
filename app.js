import express from "express";
import routes from "./routes/index.js";

const app = express();
const PORT = 3000;

// MIDDLEWARE
app.use(express.json());

// ROTAS
app.use("/", routes);

app.listen(PORT, () => console.log("Servidor rodando na porta " + PORT));
