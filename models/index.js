import { Sequelize } from "sequelize"
import sequelize from "../config/sequelize.js"
import Curso from "./curso.model.js"

export const curso = Curso(sequelize, Sequelize.DataTypes)

