import { appDataSource } from "../database/appDataSource.js";
import type { Pesquisador } from "../entities/Pesquisador.js";
import { AppError } from "../errors/AppError.js";

class PesquisadorService {
    private pesquisadorRepository = appDataSource.getRepository<Pesquisador>("Pesquisador");

    public async create(data: Pesquisador): Promise<Pesquisador> {
        const {nome, email} = data;
    if (!nome || !email) {
        throw new AppError(400, "Nome e email são obrigatórios.");
    }
    const novoPesquisador = this.pesquisadorRepository.create({ nome, email })
        await this.pesquisadorRepository.save(novoPesquisador);
        return novoPesquisador;
    }

    public async findAll(): Promise<Pesquisador[]> {
        return await this.pesquisadorRepository.find();
    }

    public async findById(id: string): Promise<Pesquisador> {
        const pesquisador = await this.pesquisadorRepository.findOneBy({ id });
        if (!pesquisador) {
            throw new  AppError(404, "Pesquisador não encontrado.");
        }
        return pesquisador;
    }

    public async update(id: string, data: Partial<Pesquisador>): Promise<Pesquisador> {
        const pesquisadrExistente = await this.findById(id);
        const pesquisadorAtualizado = this.pesquisadorRepository.merge(pesquisadrExistente, data);
        await this.pesquisadorRepository.save(pesquisadorAtualizado);
        return pesquisadorAtualizado;
    }   
    public async delete(id: string): Promise<void> {
        const pesquisador = await this.findById(id);
        await this.pesquisadorRepository.remove(pesquisador);
    }
}

export default PesquisadorService;