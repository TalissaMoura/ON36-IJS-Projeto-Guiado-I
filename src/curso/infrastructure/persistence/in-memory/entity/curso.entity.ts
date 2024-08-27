import { AlunoCurso } from "../../../../../shared/domain/models/alunoCurso.model"

export class CursoEntity {
    public id: string
    public nome: string
    public DataInicio: string
    public DataFim: string
    public professores: string[]
    public alunos: AlunoCurso[]
}
