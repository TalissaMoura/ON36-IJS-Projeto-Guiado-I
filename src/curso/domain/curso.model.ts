import { AlunoCurso } from "src/shared/domain/models/cursoAluno.model";

export class Curso {
    constructor(
        public id: string,
        public nome: string,
        public DataInicio: string,
        public DataFim: string,
        public professores: string[],
        public alunos: AlunoCurso[]
    ){}
}