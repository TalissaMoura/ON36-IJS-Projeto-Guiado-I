import { AlunoCurso } from "../../shared/domain/models/alunoCurso.model";

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