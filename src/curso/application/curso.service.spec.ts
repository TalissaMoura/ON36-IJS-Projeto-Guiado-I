import { Test, TestingModule } from '@nestjs/testing';
import { CursoService } from './curso.service';
import { CreateCursoCommand } from './command/create-curso-command';
import { AlunoModule } from '../../aluno/application/aluno.module';
import { AlunoInfrastructureModule } from '../../aluno/infrastructure/aluno-infrastructure.module';
import { Curso } from '../domain/curso.model';
import { CursoFactory } from '../domain/factory/curso.factory';
import { InMemoryCursoRepository } from '../infrastructure/persistence/in-memory/repositories/curso.repository';

describe('CursoService', () => {
  let service: CursoService;

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

    service = module.get<CursoService>(CursoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('deve retornar um curso criado para o controller', async () => {
    const cursoCriado = await service.create(cursoTest);
    expect(cursoCriado).toBeInstanceOf(Curso);
    expect(cursoCriado.id).toBeDefined();
    expect(cursoCriado.nome).toBe(cursoTest.nome);
    expect(cursoCriado.DataInicio).toBe(cursoTest.dataInicio);
    expect(cursoCriado.DataFim).toBe(cursoTest.DataFim);
    expect(cursoCriado.professores).toBe(cursoTest.professores);
    expect(cursoCriado.alunos).toStrictEqual([]);
  });
});
