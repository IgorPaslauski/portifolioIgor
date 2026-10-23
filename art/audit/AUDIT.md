# Auditoria Marco 2 — Hero + Signature Lock

Data: 2026-10-23 · Base: `http://127.0.0.1:8090` · Node `v24.15.0`  
Capturas: Playwright headless + canvas `toDataURL` · Relatório máquina: `capture-report.json`

## Veredito

O Marco 2 está **funcionalmente sólido** (scroll, reverse, âncora, demand-mode, fallback, reduced-motion).  
A presença 3D no hero **melhorou** após o peek do pin verde, mas a PoC **ainda não está visualmente aprovada**: materiais flat, aliasing, sobreposição residual no Work e waypoint de abertura pouco “cinematográfico” no viewport completo.

---

## 1. Capturas reais

| Viewport / estado | Arquivo |
|---|---|
| Hero 1440×900 | `hero-1440x900.png` + `canvas-closed-1440x900.png` |
| Hero 1920×1080 | `hero-1920x1080.png` + `canvas-closed-1920x1080.png` |
| Hero 1280×800 | `hero-1280x800.png` + `canvas-closed-1280x800.png` |
| Hero 390×844 | `hero-390x844.png` + `canvas-closed-390x844.png` |
| Lock fechado | `pose-closed.png` / `pose-closed-canvas.png` |
| Mid t≈0.25 | `pose-mid-025.png` / `pose-mid-025-canvas.png` |
| Opening t≈0.42 | `pose-opening.png` / `pose-opening-canvas.png` |
| Work t=1 | `pose-work.png` / `pose-work-canvas.png` |
| Reverse → fechado | `pose-reverse-closed.png` / `pose-reverse-closed-canvas.png` |
| Âncora `#work` | `anchor-work.png` |
| Fallback `?fallback=1` | `fallback-svg-1440.png` |
| `prefers-reduced-motion` | `reduced-motion.png` |

Script: `scripts/audit-capture.mjs`

---

## 2. Problemas por severidade

### Alta

| ID | Achado | Evidência |
|---|---|---|
| H1 | **Pin signal (#78F0A4) ilegível no seal fechado** — monograma lia como cinza puro; brand fail no primeiro viewport. | `canvas-closed-1440.png` (pré-fix) vs `hero-1440x900.png` (pós) |
| H2 | **Vite dep optimizer quebrava no Node 24** quando o cwd era o junction Desktop → `D:\ArquivosMovidos\…` (`TypeError` reading `'imports'`). | Repro: cwd junction ≠ `fs.realpathSync`; Node 24.15 |

### Média

| ID | Achado | Evidência |
|---|---|---|
| M1 | Texto “A escultura recua…” **sob a escultura fixa** no Work (z-index / contraste). | `pose-work.png`, `pose-mid-025.png` |
| M2 | Materiais ainda **matte/flat** (sem HDRI); profundidade “studio” incompleta. | Todos os canvas |
| M3 | **Aliasing** em pin e furos circulares (DPR≤1.5 + geo). | `pose-opening-canvas.png` |
| M4 | Waypoint opening **perceptível no canvas**, mas no viewport cheio o scroll já mostra Selected Work — leitura narrativa diluída. | `pose-opening.png` vs `pose-opening-canvas.png` |
| M5 | Nav API não expõe `#work` (CTA aponta `#work`; nav fica em Projetos/…). | Snapshot nav |
| M6 | Escultura `lg:fixed` permanece sobre seções abaixo do Work até o usuário scrollar além. | Layout Hero |

### Baixa

| ID | Achado |
|---|---|
| L1 | WhatsApp / BackToTop competem com o canto direito no Work. |
| L2 | Faceting low-poly intencional, mas furos do bowl pedem um pouco mais de subdivisão. |
| L3 | `Page.captureScreenshot` do browser embutido **não é confiável** para WebGL (frames ~41KB); validação exige Playwright/`toDataURL`. |

---

## 3. Correções aplicadas nesta auditoria

1. **H1** — Peek do `key`/`pin` em `poseHero` + `emissive` no pin (`poses.ts`, `MonogramModel.tsx`).
2. **H2** — Já endereçado: `scripts/dev.mjs` faz `chdir(realpath)` + `vite.config.ts` fixa `root`/`cacheDir` no realpath (Vite `^6.4.5`). Sem troca de stack.
3. **M1** — `#work` com `z-10`; caption com `text-foreground/70` (`SelectedWorkIntro.tsx`).
4. **M5** — `PRIMARY` da Navbar inclui `"work"` (só surte efeito quando a API listar o id).

Não foram implementados cases completos, Lab ou features novas.

---

## 4. Evidências de validação 3D / performance

De `capture-report.json`:

| Check | Resultado |
|---|---|
| Opening waypoint | `t = 0.419` |
| Mid | `t = 0.25` |
| Work | `t = 1` |
| Reverse scroll | `t → 0`, `reverseOk: true` |
| Âncora `#work` | `t ≈ 0.998` |
| `frameloop="demand"` | `staticDraws: 0`, `afterScroll: 12`, `demandLikely: true` |
| `?fallback=1` | `canvas: false`, `svg: true`, `paths: 23` |
| `prefers-reduced-motion` | SVG fallback, sem canvas |

Context loss: listener `webglcontextlost` → `onFail()` → SVG (`MonogramCanvas` / `MonogramStage`).

---

## 5. Ambiente — causa concreta do Vite (Node 24)

**Causa:** o workspace em `C:\Users\…\Desktop\Portifolio` é um **junction** para `D:\ArquivosMovidos\Desktop\Pessoal\Portifolio`. O optimizer do Vite resolve módulos pelo realpath mas o `root`/cwd via junction divergem → metadados de deps inconsistentes → `TypeError: Cannot read properties of undefined (reading 'imports')`.

**Correção mínima (já no repo):**
- `npm run dev` → `node scripts/dev.mjs` → `fs.realpathSync` + `process.chdir(root)` antes do Vite.
- `vite.config.ts`: `root` e `cacheDir` no realpath.

Não exige downgrade de Node nem troca de bundler.

---

## 6. Pendências para aprovação visual (gate humano)

Antes de Selected Work completo / Lab:

1. **Aprovar** o seal fechado com pin verde visível (hero 1440/1920/1280/mobile).
2. Decidir se materiais precisam de **HDRI leve** ou só ajuste de lights/metalness.
3. Confirmar se a abertura mid-scroll deve ser **mais teatral** (mais travel do key/bowl antes do recuo).
4. Revisar composição Work: escultura recuada vs caption/case — ainda sujeita a gosto.
5. Opcional: item **Work** em `navs.json` da API.
6. Revalidar visualmente após qualquer mudança de pose/material (não confiar só em build).

---

## 7. Critério de avanço

| Critério | Status |
|---|---|
| Build / runtime | OK |
| Scroll / reverse / âncora | OK |
| Demand-mode idle | OK |
| Fallback + reduced-motion | OK |
| Vite Node 24 + junction | OK (fix mínima) |
| Qualidade visual “diferenciada” | **Pendente de aprovação** |
