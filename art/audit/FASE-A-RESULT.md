# Fase A — Resultado (Production Fixes)

**Data:** 2026-10-23  
**Base:** `FINAL-AUDIT.md` / `FINAL-FIX-PLAN.md`  
**Build:** typecheck OK · `vite build` OK · preview `http://127.0.0.1:8765`  
**Capturas:** `art/audit/fase-a/` + `report.json`

## Recomendação

**GO para produção** (após smoke no domínio real pós-deploy).

Bloqueios da auditoria final (P0 Lab + P1 ThemeToggle + P1 nav + P1 copy) estão corrigidos. Medium continua sujeito a proxy externo — fallback preservado; não bloqueia GO.

---

## Problemas corrigidos

| ID | Problema | Resolução |
|---|---|---|
| A1 / P0 | Lab vazio (`VITE_API_URL` absoluto) | `publicUrl()` relativo a `import.meta.env.BASE_URL`; erro real com `role="alert"` |
| A2 / P1 | ThemeToggle sem light | Removido do header; `ThemeProvider` / `ThemeColorSync` fora do shell; `color-scheme: dark`; limpa `localStorage.theme` |
| A3 / P1 | Lab ativo em Contato | Scroll-spy único (sem IntersectionObserver); fim de página força última seção; click atualiza na hora |
| A4 / P1 | Copy interna | Removidos `experiences.json` / “Fontes: …” da UI; cases sem rodapé de fontes |

### Medium (investigação)

- **Causa:** `api.rss2json.com` — CORS / Cloudflare challenge a partir do origin local (e instável em geral).
- **Controle:** nenhum (serviço de terceiros).
- **Tratamento:** mensagem + link “Ver no Medium” (inalterado em espírito; texto um pouco mais claro).
- **Não bloqueia GO.**

---

## Arquivos alterados

| Arquivo | Mudança |
|---|---|
| `src/lib/publicUrl.ts` | **Novo** — resolve paths sob `BASE_URL` |
| `src/sections/Lab.tsx` | Fetch relativo + erro explícito + Medium |
| `src/components/navbar/Navbar.tsx` | Fetch relativo; scroll-spy; sem ThemeToggle |
| `src/App.tsx` | Sem `next-themes`; força dark + limpa storage |
| `src/components/ui/sonner.tsx` | `theme="dark"` fixo |
| `index.html` | `colorScheme` + remove `theme` do localStorage no boot |
| `src/index.css` | `color-scheme: dark`; comentário atualizado |
| `src/content/engineering.ts` | Detalhes de métrica sem nomes de arquivo |
| `src/sections/Engineering.tsx` | Removido rodapé “Fontes: …” |
| `src/components/cases/CaseShell.tsx` | Removido rodapé de fontes visitante |
| `scripts/fase-a-capture.mjs` | Validação automatizada |

**Não tocados (proposital):** Signature Lock / poses / materials; órfãos legados ainda no disco (`ThemeToggle.tsx`, `ThemeColorSync.tsx`, sections antigas) — cleanup P2.

---

## Evidências antes → depois

| Antes (auditoria) | Depois (Fase A) |
|---|---|
| Lab: “Nenhum item…” | **14** itens no arquivo; filtro `PortGo` → 1 resultado |
| Header com sol/lua | Sem ThemeToggle (desktop + mobile) |
| Contato com Lab `aria-current` | Contato → Contato; reverse OK |
| Copy com `experiences.json` / Fontes | `copyLeak.* = false` |
| demand idle | `staticDraws: 0` |

Capturas-chave:

- `fase-a/desktop-lab-loaded.png`
- `fase-a/desktop-nav-contact.png`
- `fase-a/desktop-hero-no-theme.png`
- `fase-a/mobile-lab-loaded.png`
- `fase-a/mobile-hero-no-theme.png`
- `fase-a/desktop-nav-{work,lab,engineering,contact}.png`

---

## Testes e resultados

| Check | Resultado |
|---|---|
| Typecheck | OK |
| Build | OK |
| Lab itemCount | 14 |
| Lab filter PortGo | 1 título |
| ThemeToggle | `false` |
| Nav work/lab/eng/contact | labels corretos |
| `#contact` | `t=1`, nav Contato |
| Reverse | contact→eng→lab→work com nav alinhada |
| Demand idle | `staticDraws: 0` |
| Copy leak | nenhum |
| CV HEAD | 200 |
| Mobile Lab | 14 itens, sem toggle |

Console: apenas falha esperada do rss2json (CORS) — coberta pelo fallback.

---

## Pendências não bloqueantes (P2 / backlog)

- Remover arquivos órfãos (`ThemeToggle`, `ThemeColorSync`, sections antigas) e deps (`next-themes` se não usada).
- Canonical / sitemap / meta Immersive.
- Hit areas dos ícones sociais; social duplicado no Closing.
- Compressão de assets grandes; smoke CI permanente.
- Medium: lista estática opcional se o proxy continuar instável.

---

## Critério de aceite pós-deploy

1. Abrir o domínio de produção.
2. Lab lista projetos sem depender de host absoluto.
3. Sem controle de tema.
4. Nav Contato ativa em `#contact`.
5. CV e mailto OK.
6. Escultura: scroll reverso + idle sem draw contínuo.

Com isso, o redesign Immersive Engineering está **tecnicamente apto a publicar**, sem novo ciclo de direção de arte.
