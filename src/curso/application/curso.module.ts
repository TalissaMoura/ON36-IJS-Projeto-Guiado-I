import { Module } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CursoController } from '../curso.controller';
import { AlunoModule } from 'src/aluno/application/aluno.module';
import { AlunoInfrastructureModule } from 'src/aluno/infrastructure/aluno-infrastructure.module';
@Module({
  imports: [AlunoModule.comInfraestrutura(AlunoInfrastructureModule.use("in-memory"))],
  controllers: [CursoController],
  providers: [CursoService],
})
export class CursoModule {}
