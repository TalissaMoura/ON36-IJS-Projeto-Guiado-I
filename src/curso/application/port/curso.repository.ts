import { AlunoCurso } from 'src/shared/domain/models/cursoAluno.model';
import { Curso } from '../../domain/curso.model';

export abstract class cursoRepository {
  abstract salvar(curso: Curso): Promise<Curso>;
  abstract listar(): Promise<Curso[]>;
  abstract salvarAlunoEmCurso(novoAlunoCurso:AlunoCurso): Promise<AlunoCurso>;
  abstract buscarPorAlunoId(alunoId: string): Promise<AlunoCurso>;
}