import { AlunoCurso } from "../../shared/domain/models/alunoCurso.model";

export class Aluno {
  constructor(
    public id: string,
    public nome: string,
    public endereco: string,
    public email: string,
    public telefone: string,
    public cursos: AlunoCurso[], // Depois podemos converter para um array de objetos Curso
  ) {}
}
