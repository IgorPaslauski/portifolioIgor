# Auditoria final — Immersive Engineering

**Data:** 2026-10-23  
**Build auditado:** `dist/` (typecheck OK · `vite build` OK)  
**Servido em:** `http://127.0.0.1:8765`  
**Capturas:** `art/audit/final/` (41 PNGs + `report.json`)  
**Script:** `scripts/final-audit-capture.mjs`

## Resumo executivo

O redesign forma um produto coerente: narrativa Hero → Selected Work → Lab → Engineering → Closing, paleta `#0B0D10` / `#78F0A4`, tipografia Instrument Sans + IBM Plex Mono, Signature Lock em demand-mode com fallback SVG e reduced motion. Conteúdo profissional está sóbrio e ancorado em fontes verificáveis. Não há sensação de template genérico shadcn/dashboard.

Há **um bloqueador claro** e alguns P1s de produto: o arquivo do Lab não carrega no build de produção quando a origem difere de `VITE_API_URL`; o ThemeToggle oferece tema claro sem sistema visual light; o destaque de navegação pode marcar a seção errada; textos de “fontes internas” vazam para o visitante.

**Recomendação: NO-GO para produção** até corrigir o P0 do Lab e o lote P1 mínimo do plano. Depois disso, GO com smoke test no domínio real.

---

## Avaliação por dimensão

### 1. Direção de arte e unidade visual — **Bom**

| Critério | Avaliação |
|---|---|
| Consistência entre seções | Alta — índices mono, headlines display, fundo único |
| Hierarquia / ritmo | Bom — seções longas (cases) vs densas (Lab/Engineering) |
| Composição / alinhamento | Bom em desktop; mobile empilha escultura → texto |
| Espaço negativo | Generoso sem parecer vazio |
| Paleta / bordas | Coerente; radius 0; signal verde controlado |
| Signature Lock na narrativa | Presente no hero, work, lab, engineering, closing |
| Experimental vs legibilidade | Equilibrado — 3D não compete com copy no mid-page |
| Template genérico | Não — composição editorial própria |

Não inventado: ThemeToggle residual e Lab vazio enfraquecem a leitura “produto acabado”.

### 2. Conteúdo e posicionamento — **Bom, com ressalvas**

- Posicionamento claro (“estrutura, interfaces, sistemas que duram”).
- Cases com problema / contexto / decisões; métricas só as registradas (PAD, estoque).
- Íris Pública reservada — honesto, não inventa.
- CTAs diretos (trabalho / conversa / e-mail).
- Mistura PT/EN em rótulos (`Selected Work`, `Engineering`, `Lab`) funciona como marca Immersive Engineering, não como erro.
- **Problema:** strings visitante-facing citam `experiences.json` e “Fontes: README.md …” — tom de auditoria interna.

### 3. Experiência e navegação — **Misto**

| Check | Resultado |
|---|---|
| Menu / âncoras | Scroll funciona (Trabalho, Lab, Engineering, Contato) |
| Scroll completo / reverso | OK — `t`: home≈0 → work≈0.08 → lab≈0.72 → eng≈0.80 → contact=1 |
| `#contact` direto | `t=1` |
| Refresh por seção | Não revalidado exaustivamente; poses amarradas a progresso scroll |
| Teclado | Links/botões focáveis; `focus-visible` com outline signal |
| Links CV | `HEAD` 200 em `/cv-igor-paslauski.pdf` |
| GitHub / LinkedIn / mailto | Presentes |
| Filtro Lab | UI existe; **arquivo vazio** no build auditado |
| Medium | Fallback “Artigos indisponíveis” (rss2json 403/CORS) |
| Sobreposição | Sem FAB WhatsApp; só BackToTop |

**Bug confirmado:** ao focar Contato, `aria-current` permanece em Lab (`IntersectionObserver`).

### 4. Three.js e performance — **Bom**

| Check | Resultado |
|---|---|
| Poses Hero→…→Closing | Implementadas; progresso monotônico no desktop 1440 |
| Reversibilidade | contact→eng→lab→work→home OK |
| Demand-mode idle | `staticDraws: 0` |
| Reduced motion | Sem canvas; SVG presente |
| Fallback SVG | OK |
| context lost | Listener + fail → fallback |
| Bundle GLB | `monogram.glb` ≈ 336 KB |
| Chunk R3F | `MonogramCanvas-*.js` ≈ 938 KB (gzip ~253 KB) — code-split |
| Pós-processamento pesado | Ausente (correto) |

### 5. Responsividade e acessibilidade — **Bom com P1/P2**

Viewports testados: 1920, 1440, 1280, 768, 390, 360 — **sem overflow horizontal** nos checks.

- Contraste dark + signal: adequado na hierarquia principal; muted ≈ 65% cinza — aceitável, não auditado com axe.
- Alvos sociais ~20×20 px — abaixo de 24×24 recomendado.
- Landmarks: `main`, `nav`, um `h1`.
- Sem skip-link.
- Leitor de tela: H1 “Ígor Paslauski” OK no snapshot a11y.

### 6. SEO e qualidade técnica — **Insuficiente para “fechado”**

| Item | Estado |
|---|---|
| Title / description / OG / Twitter | Presentes; copy genérica “full stack React/Node…” |
| Canonical | **Ausente** |
| Sitemap | **Ausente** |
| robots.txt | Allow `/` (sem Sitemap) |
| CV PDF | Presente (~348 KB) |
| Testes automatizados | **Nenhum** `*.test` / `*.spec` |
| Typecheck / build | OK |
| `VITE_API_URL` | Prod aponta `https://paslauski.com.br` — acopla fetches ao host absoluto |
| Órfãos | `AboutSection`, `ExperienceSection`, `SkillsSection`, `CertificationsSection`, `ContactSection`, `ContactForm`, `WhatsAppButton`, `HeroSection`, `ProjectsSection`, `SelectedWorkIntro`, etc. **não importados** por `Index` |
| Fontes npm | `@fontsource/dm-sans`, `fraunces`, `syne` **não importadas** |
| ThemeToggle | Ainda no header; tokens light = dark |

---

## Problemas classificados

### P0 — Bloqueador

#### P0-1 · Lab: arquivo vazio no build de produção
- **Localização:** `src/sections/Lab.tsx` (`fetch(VITE_API_URL + "/projects.json")`)
- **Evidência:** `art/audit/final/1440x900-lab.png`, `issue-lab-empty.png`; `report.json` → `lab.archiveText` com “Nenhum item…”; console `ERR_CERT_*` / falha ao host absoluto a partir de `127.0.0.1`
- **Impacto:** Seção Lab promete arquivo e fica oca; narrativa do portfólio quebra
- **Causa provável:** URL absoluta de produção em vez de path relativo ao origin atual
- **Correção:** Fetch relativo (`/projects.json` ou `import.meta.env.BASE_URL + "projects.json"`); fallback de erro explícito; smoke no domínio real após deploy
- **Risco de regressão:** Baixo

### P1 — Importante

#### P1-1 · ThemeToggle sem tema light real
- **Localização:** `Navbar` + `ThemeToggle` + `index.css` (`:root` e `.dark` idênticos)
- **Evidência:** `theme-light-hero.png` / `issue-theme-toggle-noop.png` — UI de sol/lua, visual permanece Immersive dark
- **Impacto:** Affordance falsa; resíduo do tema antigo
- **Correção:** Remover toggle (e opcionalmente `next-themes` do shell) **ou** implementar light de verdade (fora do escopo de “só limpar”)
- **Risco:** Baixo se só remover

#### P1-2 · Nav `aria-current` / underline incorreto
- **Localização:** `Navbar` IntersectionObserver
- **Evidência:** Click em Contato → Lab permanece `current` (browser live); captura contact com Lab sublinhado
- **Impacto:** Orientação espacial errada
- **Correção:** Ajustar `rootMargin`/threshold ou marcar ativo pelo hash / seção mais próxima do topo
- **Risco:** Médio (fácil de regressar em viewports curtos)

#### P1-3 · Textos meta para visitante
- **Localização:** `engineering.ts` (detalhe das métricas), rodapé Engineering, `CaseShell` “Fontes: …”
- **Evidência:** Snapshot a11y / tela Engineering e cases
- **Impacto:** Tom de auditoria; reduz polish profissional
- **Correção:** Reescrever detalhes sem citar nomes de arquivo; manter fontes só em comentários/código
- **Risco:** Baixo (copy only)

#### P1-4 · Medium frequentemente indisponível
- **Localização:** `Lab.tsx` → rss2json
- **Evidência:** 403 Cloudflare / CORS no preview; UI de fallback OK
- **Impacto:** Coluna de artigos vazia com frequência
- **Correção:** Aceitar fallback + “Ver no Medium” **ou** cache estático / lista manual verificada
- **Risco:** Baixo

#### P1-5 · Acoplamento `VITE_API_URL` na Navbar (e legado)
- **Localização:** `Navbar`, restos em components órfãos
- **Impacto:** Nav tem fallback; Lab não. Mesmo padrão frágil
- **Correção:** Relativo + fallback (já existe para nav)
- **Risco:** Baixo

### P2 — Refinamento

| ID | Achado | Correção sugerida |
|---|---|---|
| P2-1 | Sem canonical / sitemap | Adicionar `link rel=canonical` + `sitemap.xml` referenciado em robots |
| P2-2 | Meta/OG genéricos (não citam Immersive Engineering) | Atualizar copy alinhada ao posicionamento |
| P2-3 | Ícones sociais ~20px | Aumentar hit area (≥44px touch / ≥24px alvo) |
| P2-4 | Contato: LinkedIn/GitHub duplicados (botões + ícones) | Manter um conjunto |
| P2-5 | Órfãos + fontes npm não usadas + UI shadcn morta | Remover após confirmação de não uso |
| P2-6 | Imagem `folgen-group` ~2.8 MB no `public/` | Comprimir ou lazy |
| P2-7 | Chunk Three ~938 KB | Aceitável com lazy; opcional Draco/mais agressivo só se necessário |
| P2-8 | Sem suite de testes | Smoke Playwright mínimo (nav + Lab populate + demand) |
| P2-9 | Package name `vite_react_shadcn_ts` | Renomear |
| P2-10 | Lab/Engineering progress próximos (0.72 / 0.80) | Opcional: alongar janela de pose Lab |

---

## Evidências (principais)

| Arquivo | Conteúdo |
|---|---|
| `final/1440x900-home.png` | Hero + Lock |
| `final/1440x900-work.png` | Selected Work |
| `final/1440x900-lab.png` | Lab vazio (P0) |
| `final/1440x900-engineering.png` | Engineering |
| `final/1440x900-contact.png` | Closing + nav ativa errada |
| `final/1440x900-*-full.png` | Home completa |
| `final/390x844-*.png` / `360x800-*.png` | Mobile |
| `final/reduced-motion-*.png` | SVG / sem WebGL |
| `final/issue-*.png` | Evidências nomeadas dos achados |
| `final/report.json` | Progresso, demand, SEO, overflow |

---

## Critérios de aceite (produção)

1. Lab lista o arquivo a partir do mesmo origin (não depende de host absoluto).
2. ThemeToggle removido **ou** light mode visualmente intencional.
3. Nav `aria-current` corresponde à seção visível (inclui Contato).
4. Copy visitante sem nomes de arquivos internos (`*.json`).
5. Typecheck + build OK; CV 200; demand idle; reduced motion com SVG.
6. Smoke no domínio de produção após deploy: `#work` `#lab` `#engineering` `#contact`, Lab populado, CV, e-mail.

---

## Recomendação

| Decisão | |
|---|---|
| **NO-GO** | Até P0-1 + P1-1 + P1-2 + P1-3 |
| Após isso | **GO** com smoke no host real; P1-4 e P2 em backlog curto |

O redesign **não** precisa de outro ciclo de direção de arte. Os achados são de fechamento de produto, não de reinvenção.
