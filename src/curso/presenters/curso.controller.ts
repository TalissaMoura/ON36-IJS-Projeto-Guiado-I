import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CursoService } from '../application/curso.service';
import { CreateCursoDto } from './http/dto/create-curso.dto';
import { CreateCursoCommand } from '../application/command/create-curso-command';

@Controller('curso')
export class CursoController {
  constructor(private readonly cursoService: CursoService) {}

  @Post()
  create(@Body() createCursoDto: CreateCursoDto) {
    return this.cursoService.create(
      new CreateCursoCommand(
        createCursoDto.nome,
        createCursoDto.dataInicio,
        createCursoDto.dataFim,
        createCursoDto.professores,
        )
    );
  }

  @Get()
  listar() {
    return this.cursoService.listar();
  }

  @Post('matricular')
  async adicionaAlunoParaCurso(@Body() body: { alunoEmail: string; cursoId: string }) {
    await this.cursoService.adicionaAlunoAoCurso(body.alunoEmail,body.cursoId);
    return { message: 'Aluno matriculado com sucesso!' };
  }
}
