import { Curso } from "../../../../domain/curso.model";
import { CursoEntity } from "../entity/curso.entity";

export class CursoMapper {
static paraDominio(cursoEntity: CursoEntity): Curso {
    const model = new Curso(
        cursoEntity.id,
        cursoEntity.nome,
        cursoEntity.DataInicio,
        cursoEntity.DataFim,
        cursoEntity.professores,
        cursoEntity.alunos);
    return model;
  }

  static paraPersistencia(curso: Curso) {
    const entity = new CursoEntity();
    entity.id = curso.id;
    entity.nome = curso.nome;
    entity.DataFim = curso.DataFim;
    entity.DataInicio = curso.DataInicio;
    entity.professores = curso.professores;
    entity.alunos = curso.alunos;
    return entity;
  }
}
