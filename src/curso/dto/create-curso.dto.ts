import { IsArray, IsString, Max, MAX } from "class-validator";

export class CreateCursoDto {
    @IsString()
    nome:string

    @IsString()
    dataInicio: string

    @IsString()
    dataFim: string 

    @IsArray()
    professores: string[]

    @IsArray()
    @Max(30)
    alunos: string[]
}
