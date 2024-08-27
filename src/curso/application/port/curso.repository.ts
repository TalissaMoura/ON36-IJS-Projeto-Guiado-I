import { AlunoCurso } from '../../../shared/domain/models/alunoCurso.model';
import { Curso } from '../../domain/curso.model';


export abstract class CursoRepository {
  abstract salvar(curso: Curso): Promise<Curso>;
  abstract listar(): Promise<Curso[]>;
  abstract salvarAlunoEmCurso(novoAlunoCurso:AlunoCurso): Promise<void>;
  abstract listarAlunosMatriculados(cursoId:string): Promise<string[]>
}