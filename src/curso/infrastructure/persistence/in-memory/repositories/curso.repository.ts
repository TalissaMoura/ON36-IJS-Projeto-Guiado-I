import { CursoRepository } from "../../../../application/port/curso.repository";
import { CursoEntity } from "../entity/curso.entity";
import { Curso } from "../../../../domain/curso.model";
import { AlunoCurso } from "../../../../../shared/domain/models/alunoCurso.model";
import { CursoMapper } from "../mapper/curso-mapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class InMemoryCursoRepository implements CursoRepository {
    private readonly cursos = new Map<string, CursoEntity>();

    async salvar(curso: Curso): Promise<Curso> {
        const persistenceModel = CursoMapper.paraPersistencia(curso);
        this.cursos.set(persistenceModel.id, persistenceModel);
        const newEntity = this.cursos.get(persistenceModel.id);
        return CursoMapper.paraDominio(newEntity);
    }

    async listar(): Promise<Curso[]> {
        const entities = Array.from(this.cursos.values());
        return entities.map((item) => CursoMapper.paraDominio(item));
    }
    async salvarAlunoEmCurso(novoAlunoCurso: AlunoCurso): Promise<void> {
        const cursoEntity = this.cursos.get(novoAlunoCurso.cursoId)
        const cursoModel = CursoMapper.paraDominio(cursoEntity)
        cursoModel.alunos.push(novoAlunoCurso)
        const persistenceModel = CursoMapper.paraPersistencia(cursoModel)
        this.cursos.set(persistenceModel.id,persistenceModel) // save new model
    }

    async listarAlunosMatriculados(cursoId:string): Promise<string[]> {
        const cursoEntity = this.cursos.get(cursoId)
        return cursoEntity.alunos.map((item:AlunoCurso)=>item.alunoEmail)
    }

}