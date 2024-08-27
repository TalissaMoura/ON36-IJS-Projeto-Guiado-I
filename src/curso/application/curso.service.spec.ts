import { Test, TestingModule } from '@nestjs/testing';
import { CursoService } from './curso.service';
import { CreateCursoCommand } from './command/create-curso-command';
import { AlunoModule } from '../../aluno/application/aluno.module';
import { AlunoInfrastructureModule } from '../../aluno/infrastructure/aluno-infrastructure.module';
import { Curso } from '../domain/curso.model';
import { CursoFactory } from '../domain/factory/curso.factory';
import { InMemoryCursoRepository } from '../infrastructure/persistence/in-memory/repositories/curso.repository';
import { uuid } from 'uuidv4';
import { CreateAlunoCommand } from '../../aluno/application/commands/create-aluno-command';
import { AlunoService } from '../../aluno/application/aluno.service';

jest.mock('uuidv4');

describe('CursoService', () => {
  let cursoService: CursoService;
  let alunoService: AlunoService;

  const cursoTest = {
    nome: 'aprenda fotografia',
    dataInicio: "2023-11-12",
    DataFim: "2023-11-13",
    professores: ["Claudia Helena"],
  } as CreateCursoCommand;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CursoService,CursoFactory,InMemoryCursoRepository],
      imports: [AlunoModule.comInfraestrutura(AlunoInfrastructureModule.use("in-memory"))]
    }).compile();

    cursoService = module.get<CursoService>(CursoService);
    alunoService = module.get<AlunoService>(AlunoService)
  });

  it('cursoService should be defined', () => {
    expect(cursoService).toBeDefined();
    
  });
  it('alunoService should be defined', () => {
    expect(alunoService).toBeDefined();
  });
  it('deve retornar um curso criado para o controller', async () => {
    (uuid as jest.Mock).mockReturnValue("3454")

    const cursoCriado = await cursoService.create(cursoTest);

    expect(cursoCriado).toBeInstanceOf(Curso);
    expect(cursoCriado.id).toBe("3454");
    expect(cursoCriado.nome).toBe(cursoTest.nome);
    expect(cursoCriado.DataInicio).toBe(cursoTest.dataInicio);
    expect(cursoCriado.DataFim).toBe(cursoTest.DataFim);
    expect(cursoCriado.professores).toBe(cursoTest.professores);
    expect(cursoCriado.alunos).toStrictEqual([]);
  });

  it("Deve retornar aluno matriculado",async () => {
    (uuid as jest.Mock).mockReturnValue("5874")
    const alunoEmail = "robertosilva1@gmail.com"

    const alunoTest = {
      nome: "Roberto",
      endereco: "Avenida Laranja, 234",
      email: alunoEmail,
      anoNascimento: 1997
    } as CreateAlunoCommand;

    const alunoCriado = await alunoService.cadastrar(alunoTest)

    const cursoCriado = await cursoService.create(cursoTest);


    cursoService.adicionaAlunoAoCurso(alunoEmail,"5874")

    const alunosMatriculados = await cursoService.listarAlunosMatriculados("5874")
    const cursosDoAluno = await alunoService.listarCursosDoAluno("5874")

    expect(alunosMatriculados).toContain(alunoEmail) // curso contém aluno 
    expect(cursosDoAluno).toContain("5874") // aluno contém curso

  })
});
