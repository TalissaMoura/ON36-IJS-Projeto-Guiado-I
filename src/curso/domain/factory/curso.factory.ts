import { uuid } from "uuidv4";
import { Curso } from "../curso.model";

export class cursoFactory {
    criar(nome:string,dataInicio:string,DataFim:string,professores:string[]){
       const cursoId = uuid()
       const alunos = []
       return new Curso(cursoId,nome,dataInicio,DataFim,professores,alunos)
    }
}