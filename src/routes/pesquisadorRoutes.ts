import { Router } from "express";
import PesquisadorController from "../controllers/PesquisadorController.js";
import PesquisadorService from "../services/PesquisadorService.js";
import { validarPesquisador } from "../middleware/validarPesquisador.js";

const pesquisadorRouter = Router();

const pesquisadorService = new PesquisadorService();
const pesquisadorController = new PesquisadorController(pesquisadorService);


pesquisadorRouter.get('/pesquisadores', (req, res) => pesquisadorController.findAll(req, res));

pesquisadorRouter.get('/pesquisadores/:id', (req, res) => pesquisadorController.findById(req, res));

pesquisadorRouter.post('/pesquisadores', validarPesquisador, (req, res) => pesquisadorController.create(req, res));

pesquisadorRouter.put('/pesquisadores/:id', (req, res) => pesquisadorController.update(req, res));

pesquisadorRouter.delete('/pesquisadores/:id', (req, res) => pesquisadorController.delete(req, res));

export default pesquisadorRouter;