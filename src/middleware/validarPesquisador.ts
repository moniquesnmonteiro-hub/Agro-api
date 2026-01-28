
import { AppError } from '../errors/AppError.js';
import { appDataSource } from '../database/appDataSource.js';
import { Pesquisador } from '../entities/Pesquisador.js';
import type { Request, Response, NextFunction } from 'express';

export const validarPesquisador = async (req: Request, res: Response, next: NextFunction) => {
    const { nome, email, senha, matricula, titulacao, dataNascimento } = req.body;
    const pesquisadorRepository = appDataSource.getRepository(Pesquisador);

    if (!nome || !email || !senha || !matricula || !titulacao || !dataNascimento) {
        throw new AppError(400, "Todos os campos (nome, email, senha, matricula, titulacao, dataNascimento) são obrigatórios.");
    }

    const emailExiste = await pesquisadorRepository.findOneBy({ email });
    if (emailExiste) {
        throw new AppError(400, "O e-mail informado já está em uso.");
    }

    const matriculaExiste = await pesquisadorRepository.findOneBy({ matricula });
    if (matriculaExiste) {
        throw new AppError(400, "A matrícula informada já está em uso.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new AppError(400, "O formato do e-mail é inválido.");
    }

    if (senha.length < 8) {
        throw new AppError(400, "A senha deve ter no mínimo 8 caracteres.");
    }

    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }

    if (idade < 18) {
        throw new AppError(400, "O pesquisador deve ter no mínimo 18 anos completos.");
    }

    const titulacoesValidas = ["Graduação", "Especialização", "Mestrado", "Doutorado"];
    if (!titulacoesValidas.includes(titulacao)) {
        throw new AppError(400, `Titulação inválida. Valores aceitos: ${titulacoesValidas.join(", ")}.`);
    }

    return next();
};