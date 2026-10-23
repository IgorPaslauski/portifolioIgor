# Fase 2 — Selected Work + Lab

## Decisões visuais

- **Íris:** capítulo tipográfico reservado — sem claims.
- **PuroSuco:** pipeline horizontal de 5 estágios + dois code exhibits reais (`hello.suco` ↔ C#) + vocabulário + decisões de arquitetura (parser único / CLI / LSP).
- **Layout+:** esquema antes/depois (Default vs Wide) com faixas do README — **não** screenshot inventado; nota explícita na UI.
- **Fire Sim:** grade esquemática + binários/controles/decisões do README — **sem** benchmarks.
- **Lab:** arquivo denso (lista tipográfica + filtro) + Medium; distinto dos cases full-bleed.

## Evidências técnicas

| Case | Fontes |
|---|---|
| PuroSuco | README + `examples/hello.suco` (repo IgorPaslauski/purosuco) |
| Layout+ | README (presets, ranges, privacy, Manifest V3) |
| Fire Sim | README (binários, controles, MPI_Reduce, SDL/ncurses) |
| Íris | Nenhum — slot reservado |
| Lab arquivo | `public/projects.json` (exclui ids 3,4,11) |
| Lab artigos | Medium RSS `@igor.pedroso123` |

## 3D

- `poseLabDetail` + segmento `t 0.72→1` work→lab.
- Progresso `home→lab`; âncoras `#work` / `#lab`.
- Demand-mode preservado; hero art pass não reaberto.

## Testes

- `tsc -p tsconfig.app.json --noEmit` — OK
- Capturas: `art/audit/fase2/` via `scripts/fase2-capture.mjs`

## Validação

| Check | Resultado |
|---|---|
| Typecheck | OK |
| Nav | Trabalho · Lab · Experiência · Contato |
| `t` em `#lab` | 1 |
| Demand idle | `staticDraws: 0` |
| Capturas | `art/audit/fase2/*.png` |

## Problemas conhecidos

- Sem screenshots reais de Layout+/Fire no portfólio — esquemas rotulados como ilustrativos.
- Medium RSS pode falhar em ambientes headless (`Artigos indisponíveis`); link direto ao Medium permanece.
- ProjectsSection / PostsSection fora do Index (código preservado); Lab é a superfície viva.
- Escultura faz fade após opening para não cobrir cases longos (ajuste de integração Fase 2, não art pass do hero).
