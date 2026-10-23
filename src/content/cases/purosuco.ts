import type { CaseBase, CodeExhibit, Decision, PipelineStage } from "./types";

/** Grounded in https://github.com/IgorPaslauski/purosuco README + examples/hello.suco */
export const puroSucoCase: CaseBase & {
  problem: string;
  context: string;
  pipeline: PipelineStage[];
  exhibits: CodeExhibit[];
  decisions: Decision[];
  vocabSample: { csharp: string; suco: string }[];
} = {
  id: "purosuco",
  index: "02",
  title: "PuroSuco",
  subtitle: "Linguagem experimental em .NET 8 que transpila para C#.",
  status: "published",
  stack: ["C#", ".NET 8", "LSP", "VS Code"],
  repo: {
    href: "https://github.com/IgorPaslauski/purosuco",
    label: "Repositório",
    external: true,
  },
  sources: [
    "README.md (IgorPaslauski/purosuco)",
    "examples/hello.suco",
    "Roadmap marcado no README",
  ],
  problem:
    "Explorar o pipeline completo de um compilador — do token ao C# gerado — sem separar a linguagem da experiência de editor.",
  context:
    "PuroSuco é uma linguagem experimental baseada em memes brasileiros. O meme precisa fazer sentido com a operação: public vira AMOSTRADINHO porque está exposto; = vira RECEBA porque a variável recebe um valor.",
  pipeline: [
    {
      id: "lexer",
      label: "Lexer",
      detail: "Tokenização inicial e keywords meme.",
    },
    {
      id: "parser",
      label: "Parser + AST",
      detail: "Árvore própria, inclusive loops BORA_BILL e ENQUANTO_TANKAR.",
    },
    {
      id: "semantic",
      label: "Semântica",
      detail: "Diagnósticos, tabela de símbolos, escopos e retornos.",
    },
    {
      id: "codegen",
      label: "Codegen",
      detail: "Transpilação para C# (.g.cs) via CLI.",
    },
    {
      id: "lsp",
      label: "LSP + editores",
      detail: "Mesmo parser no Language Server — VS Code/Cursor e base Zed.",
    },
  ],
  exhibits: [
    {
      caption: "Fonte — examples/hello.suco",
      language: "suco",
      filename: "hello.suco",
      code: `AMOSTRADINHO TROPA Programa {

    AMOSTRADINHO SEMPRE_FOI_ASSIM VOLTA_NADA Main() {

        NUMERO idade RECEBA 23;

        TA_CERTO_ISSO idade >= 18 {
            MANDA_AI("RECEBA!");
        }
        NAO_TA_NAO {
            MANDA_AI("Aí não.");
        }
    }
}`,
    },
    {
      caption: "Equivalente aproximado em C# (README)",
      language: "csharp",
      filename: "Programa.cs",
      code: `public class Programa
{
    public void Main()
    {
        int idade = 23;

        if (idade >= 18)
        {
            Console.WriteLine("RECEBA!");
        }
        else
        {
            Console.WriteLine("Aí não.");
        }
    }
}`,
    },
  ],
  decisions: [
    {
      title: "Um parser, vários consumidores",
      body: "O Language Server usa o mesmo parser e analisador semântico da CLI, evitando duplicar regras no editor.",
    },
    {
      title: "CLI como superfície de inspeção",
      body: "Comandos tokens, ast, check e traduz expõem cada estágio — útil para debugar a linguagem e o próprio compilador.",
    },
    {
      title: "LSP compartilhado",
      body: "Autocomplete, hover, go-to-definition, rename, formatter e quick fixes no mesmo servidor para VS Code/Cursor (e Zed no futuro).",
    },
  ],
  vocabSample: [
    { csharp: "public", suco: "AMOSTRADINHO" },
    { csharp: "class", suco: "TROPA" },
    { csharp: "if / else", suco: "TA_CERTO_ISSO / NAO_TA_NAO" },
    { csharp: "=", suco: "RECEBA" },
    { csharp: "void", suco: "VOLTA_NADA" },
    { csharp: "print", suco: "MANDA_AI" },
  ],
};
