import { z } from "zod";

export const createPesquisadorSchema = z.object({
    nome: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Formato de email inválido"),
    senha: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
    matricula: z.string().min(1, "Matrícula é obrigatória"),
    especialidade: z.string().min(1, "Especialidade é obrigatória"),
    titulacao: z.enum(["Graduação", "Especialização", "Mestrado", "Doutorado"], {
        message: "Titulação inválida"
    }),
    linhaPesquisa: z.string().optional(),
    dataNascimento: z.string().refine((val) => {
        const dataNasc = new Date(val);
        const hoje = new Date();
        let idade = hoje.getFullYear() - dataNasc.getFullYear();
        const m = hoje.getMonth() - dataNasc.getMonth();
        if (m < 0 || (m === 0 && hoje.getDate() < dataNasc.getDate())) {
            idade--;
        }
        return idade >= 18;
    }, { message: "O pesquisador deve ter no mínimo 18 anos completos" })
});