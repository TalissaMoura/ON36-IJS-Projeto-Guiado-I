import { Injectable } from '@nestjs/common';
import { AlunoRepository } from '../../../../application/ports/aluno.repository';
import { AlunoEntity } from '../entities/aluno.entity';
import { Aluno } from '../../../../domain/aluno';
import { AlunoMapper } from '../mappers/aluno.mapper';
import { AlunoCurso } from 'src/shared/domain/models/alunoCurso.model';

@Injectable()
export class InMemoryAlunoRepository implements AlunoRepository {
  private readonly alunos = new Map<string, AlunoEntity>();

  async salvar(aluno: Aluno): Promise<Aluno> {
    const persistenceModel = AlunoMapper.paraPersistencia(aluno);
    this.alunos.set(persistenceModel.id, persistenceModel);
    const newEntity = this.alunos.get(persistenceModel.id);
    return AlunoMapper.paraDominio(newEntity);
  }

  async listar(): Promise<Aluno[]> {
    const entities = Array.from(this.alunos.values());
    return entities.map((item) => AlunoMapper.paraDominio(item));
  }

  async buscarPorEmail(email: string): Promise<Aluno|null>{
    const entities = Array.from(this.alunos.values());
    const alunoEncontrado = entities.find((item) => item.email === email);
    if (!alunoEncontrado) {
      return null;
    }
    return AlunoMapper.paraDominio(alunoEncontrado);
  }

  async salvarCursoEmAluno(alunoEmail: string, cursoId: string): Promise<void> {
    const alunoCurso: AlunoCurso = { alunoEmail, cursoId }
    const aluno = await this.buscarPorEmail(alunoEmail)
    aluno.cursos.push(alunoCurso)
    const updatedAlunoPersistenceModel = AlunoMapper.paraPersistencia(aluno)
    this.alunos.set(updatedAlunoPersistenceModel.id, updatedAlunoPersistenceModel);
  }

  async listarCursosDoAluno(alunoId: string): Promise<string[]> {
      const alunoEntity = this.alunos.get(alunoId)
      return alunoEntity.cursos.map((item:AlunoCurso)=>item.cursoId)
  }
}

// Esse é o nosso adapter para persitencia em memória
