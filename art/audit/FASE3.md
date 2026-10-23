# Fase 3 — Engineering + Closing

## Decisões

### Engineering
- Capítulos assimétricos Abase → Tecnicon a partir de `experiences.json` (typos corrigidos: Firebird, EJB, “com a solução”, transferência).
- Métricas display só as registradas: PAD ~2 min; estoque ~2 h → 3 min.
- Cinco áreas de atuação com stacks de experiences + skills — sem mural de logos / níveis.
- Sem timeline clássica.

### Closing
- Eco do hero em `#0B0D10`: e-mail como ação principal; LinkedIn, GitHub, CV PDF validado (`/cv-igor-paslauski.pdf` → 200).
- Formulário legado omitido (mailto direto).
- WhatsApp FAB removido; BackToTop único e discreto.

### 3D
- Poses `poseEngineering` + `poseClosing` (≈ hero).
- Progresso `home → contact`: … → lab → engineering → closing.
- Plano fixo some no meio da página e restaura no Closing.
- Demand-mode preservado.

### Migração
- Index: Hero → SelectedWork → Lab → Engineering → Closing.
- Removidos do Index: Skills, Experience, About, Certifications, Contact legado, WhatsApp.
- Código legado permanece em `src/components/*` (não referenciado) — cleanup físico opcional.
- `navs.json`: Home · Trabalho · Lab · Engineering · Contato.

## Evidências

| Item | Fonte |
|---|---|
| Trajetória / métricas | `public/experiences.json` |
| Áreas / tools | experiences + `skills.json` |
| CV | `public/cv-igor-paslauski.pdf` |
| Contato | `src/content/site.ts` |

## Validação

| Check | Resultado |
|---|---|
| Typecheck | OK |
| Build | OK |
| Nav | Trabalho · Lab · Engineering · Contato |
| `t` engineering | ≈ 0.82 |
| `t` contact / `#contact` | 1 |
| Reverse contact→eng→lab | 1 → 0.82 → 0.63 |
| Demand idle | `staticDraws: 0` |
| CV HEAD | 200 |

Capturas: `art/audit/fase3/` (`desktop|mobile`-`engineering|contact`, `canvas-*`, `desktop-anchor-contact`).

## Problemas conhecidos

- Componentes órfãos ainda no disco (`ExperienceSection`, `ContactSection`, etc.) — fora do tree.
- ThemeToggle / light mode ainda no header (fora do escopo desta fase).
- Escultura no Closing depende do fade restore; em viewports muito curtos o timing do t pode variar levemente.
