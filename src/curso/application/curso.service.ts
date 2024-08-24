import { Injectable } from '@nestjs/common';
import { cursoRepository } from './port/curso.repository';
import { cursoFactory } from '../domain/factory/curso.factory';
import { CreateCursoCommand } from './command/create-curso-command';
import { AlunoService } from 'src/aluno/application/aluno.service';
import { AlunoCurso } from 'src/shared/domain/models/cursoAluno.model';

@Injectable()
export class CursoService {
  constructor(
    private readonly cursoRepository: cursoRepository,
    private readonly cursoFactory: cursoFactory,
    private readonly alunoService: AlunoService
  ){}
  create(createCursoCommand: CreateCursoCommand) {
    const novoCurso = this.cursoFactory.criar(
        createCursoCommand.nome,
        createCursoCommand.dataInicio,
        createCursoCommand.DataFim,
        createCursoCommand.professores
    )

    this.cursoRepository.salvar(novoCurso)
  }

 async adicionaAlunoAoCurso(alunoEmail:string,cursoId:string):Promise<void>{

    const aluno = this.alunoService.buscarAlunoPorEmail(alunoEmail)

    const alunoCurso: AlunoCurso = { alunoEmail, cursoId }

    await this.cursoRepository.salvarAlunoEmCurso(alunoCurso)
}
}
