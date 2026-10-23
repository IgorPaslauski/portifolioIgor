# Art pass — Marco 2 (direção de arte)

Data: 2026-10-23 · Validação: Playwright + canvas `toDataURL` · `capture-report.json`

## Síntese das mudanças

### P0 — Materialidade e iluminação
- Env map de estúdio procedural (painéis soft key/fill/rim via PMREM) — estático, compatível com `frameloop="demand"`.
- Materiais acetinados: metalness↑ / roughness↓ controlados; pin com emissive baixo (sem neon).
- Luzes: key quente + rim frio + fill frontal; ACES + exposição 1.05.
- Normais recomputadas no load; script Blender com cilindros 96 verts / bevel 4 segs (rebuild GLB pendente — Blender fora do PATH).

### P0 — Coreografia Hero → Work
- Nova pose **`unlock`**: key retira → pin sobe (desbloqueio), depois separação (`opening`), depois recuo (`work`).
- Janela de scroll alongada (start 32% do hero, end ≈ topo `#work`, min ≈ 65vh / 480px). Sem hijack.
- Reverse `t→0` OK; âncora `#work` → `t=1`.

### P1 — Composição
- Plano 3D encolhe 50%→34% e empurra à direita conforme progress.
- Work pose menor e mais à direita; copy Selected Work consolidada à esquerda (sem caption sob a escultura).
- Nav injeta **Trabalho → #work** se a API não trouxer.
- FABs com opacidade reduzida.

### P1 — Render
- DPR desktop até 2; `antialias: true`; demand-mode confirmado (`staticDraws: 0`).

---

## Capturas comparativas

| Estado | Before | After |
|---|---|---|
| Hero 1440 fechado | `before-hero-1440.png` | `after-hero-1440x900.png` |
| Canvas fechado | `before-closed-canvas.png` | `after-closed-canvas.png` |
| Unlock (~0.2) | — | `after-unlock.png` / `after-unlock-canvas.png` |
| Opening (~0.52) | `before-opening-canvas.png` | `after-opening-canvas.png` |
| Work | `before-work.png` | `after-work.png` |
| Fallback SVG | `before-fallback.png` | `fallback-svg-1440.png` |
| Mobile 390 | — | `after-hero-390x844.png` |
| Notebook 1280 | — | `after-hero-1280x800.png` |
| Desktop 1920 | — | `after-hero-1920x1080.png` |

---

## Checks (pós-pass)

| Check | Resultado |
|---|---|
| Unlock | `t ≈ 0.20` |
| Opening | `t = 0.52` |
| Work | `t = 1` |
| Reverse | `t → 0` |
| Âncora `#work` | `t = 1` |
| Demand idle | `staticDraws: 0`, draws no scroll |
| Fallback / reduced-motion | SVG, sem canvas |
| `__studioEnv` | `true` |

---

## Regressões e limitações

1. **Faceting do pin/furos** — geometria atual do GLB; rebuild Blender (script já preparado) necessário para suavizar de verdade.
2. **Satin ainda sutil** em capturas headless — env aplicado, mas sem AO/HDRI fotográfico; próximo ganho real = rebuild + opcional AO bake leve no asset.
3. **Aliasing residual** em silhuetas diagonais — DPR 2 mitiga; SMAA contínuo foi evitado de propósito (GPU idle).
4. Escultura `lg:fixed` ainda existe sob o Work (menor/recuada); intenção narrativa, não sumiu 100%.

---

## Pedido de aprovação

PoC pronta para **aprovação visual humana** nas capturas `after-*` vs `before-*`.  
Sem cases/Lab nesta etapa. Se aprovado, o próximo marco é Selected Work completo.
