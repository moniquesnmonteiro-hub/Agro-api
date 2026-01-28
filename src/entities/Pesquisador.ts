import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("pesquisadores")
export class Pesquisador {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", nullable: false })
    nome: string;

    @Column({ type: "varchar", unique: true, nullable: false })
    email: string;

    @Column({ type: "varchar", nullable: false })
    senha: string;

    @Column({ type: "varchar", unique: true, nullable: false })
    matricula: string;

    @Column({ type: "varchar", nullable: false })
    especialidade: string;

    @Column({ type: "varchar", nullable: false })
    titulacao: string;

    @Column({ type: "varchar", nullable: true })
    linhaPesquisa?: string;

    @Column({ type: "date", nullable: false })
    dataNascimento: string;
}