import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateAlunoCommand } from './commands/create-aluno-command';
import { AlunoRepository } from './ports/aluno.repository';
import { AlunoFactory } from '../domain/factories/aluno-factory';

@Injectable()
export class AlunoService {
  constructor(
    private readonly alunoRepository: AlunoRepository,
    private readonly alunoFactory: AlunoFactory,
  ) {}

  async cadastrar(createAlunoCommand: CreateAlunoCommand) {
    await this.validarIdadeMinima(createAlunoCommand);
    await this.validarSeJaExiste(createAlunoCommand);

    const novoAluno = this.alunoFactory.criar(
      createAlunoCommand.nome,
      createAlunoCommand.endereco,
      createAlunoCommand.email,
      createAlunoCommand.telefone,
    );

    return this.alunoRepository.salvar(novoAluno);
  }

  private async validarSeJaExiste(createAlunoCommand: CreateAlunoCommand) {
    const alunoExistente = await this.alunoRepository.buscarPorEmail(
      createAlunoCommand.email,
    );
    if (alunoExistente) {
      throw new ConflictException(
        'Já existe um aluno cadastrado com esse email.',
      );
    }
  }

  private async validarIdadeMinima(createAlunoCommand: CreateAlunoCommand) {
    const anoAtual = new Date().getFullYear();
    const idade = anoAtual - createAlunoCommand.anoNascimento;
    const IDADE_MIN_CADASTRO = 16;
    if (idade <= IDADE_MIN_CADASTRO) {
      throw new ForbiddenException('A idade mínima para cadastro é 16 anos.');
    }
  }

  async listar() {
    return await this.alunoRepository.listar();
  }

  async buscarAlunoPorEmail(alunoEmail:string){
    return await this.alunoRepository.buscarPorEmail(alunoEmail)
  }

  async salvarCursoEmAluno(alunoEmail:string,cursoId:string){
    return await this.alunoRepository.salvarCursoEmAluno(alunoEmail,cursoId)
  }

  async listarCursosDoAluno(alunoId:string){
    return await this.alunoRepository.listarCursosDoAluno(alunoId)
  }
}
