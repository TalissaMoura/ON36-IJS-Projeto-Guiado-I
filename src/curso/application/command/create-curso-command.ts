export class CreateCursoCommand {
    constructor(
      public readonly nome: string,
      public readonly dataInicio: string,
      public readonly DataFim: string,
      public readonly professores: string[]
    ) {}
  }
  