import { Module } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CursoController } from '../presenters/curso.controller';
import { AlunoModule } from '../../aluno/application/aluno.module';
import { AlunoInfrastructureModule } from '../../aluno/infrastructure/aluno-infrastructure.module';
import { CursoFactory } from '../domain/factory/curso.factory';
import { InMemoryCursoRepository } from '../infrastructure/persistence/in-memory/repositories/curso.repository';
import { AlunoService } from '../../aluno/application/aluno.service';

@Module({
  imports: [AlunoModule.comInfraestrutura(AlunoInfrastructureModule.use("in-memory"))],
  controllers: [CursoController],
  providers: [CursoService,CursoFactory,InMemoryCursoRepository],
})
export class CursoModule {}
