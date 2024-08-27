import { Injectable } from '@nestjs/common';
import { CursoFactory } from '../domain/factory/curso.factory';
import { CreateCursoCommand } from './command/create-curso-command';
import { AlunoService } from '../../aluno/application/aluno.service';
import { AlunoCurso } from '../../shared/domain/models/alunoCurso.model';
import { InMemoryCursoRepository } from '../infrastructure/persistence/in-memory/repositories/curso.repository';

@Injectable()
export class CursoService {
  constructor(
    private readonly cursoRepository: InMemoryCursoRepository,
    private readonly cursoFactory: CursoFactory,
    private readonly alunoService: AlunoService
  ){}
  create(createCursoCommand: CreateCursoCommand) {
    const novoCurso = this.cursoFactory.criar(
        createCursoCommand.nome,
        createCursoCommand.dataInicio,
        createCursoCommand.DataFim,
        createCursoCommand.professores
    )

    return this.cursoRepository.salvar(novoCurso)
  }

  listar(){
    return this.cursoRepository.listar()
  }

 async adicionaAlunoAoCurso(alunoEmail:string,cursoId:string):Promise<void>{

    const aluno = this.alunoService.buscarAlunoPorEmail(alunoEmail)

    const alunoCurso: AlunoCurso = { alunoEmail, cursoId }

    await this.cursoRepository.salvarAlunoEmCurso(alunoCurso)

    await this.alunoService.salvarCursoEmAluno(alunoEmail,cursoId)
}
}
